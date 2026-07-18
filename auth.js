// ============================================
// auth.js - نظام المصادقة مع Firebase + Firestore
// (نسخة احترافية: Single Session، فحص عند Refresh فقط، بدون Race Condition)
// ============================================

// ============================================
// عناصر DOM (النوافذ الجديدة)
// ============================================
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const authModalTitle = document.getElementById('authModalTitle');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const resetForm = document.getElementById('resetForm');

const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authLoginBtn = document.getElementById('authLoginBtn');
const authError = document.getElementById('authError');
const togglePassword = document.getElementById('togglePassword');

const signupUsername = document.getElementById('signupUsername');
const signupLastname = document.getElementById('signupLastname');
const signupFirstname = document.getElementById('signupFirstname');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const authSignupBtn = document.getElementById('authSignupBtn');
const signupError = document.getElementById('signupError');
const toggleSignupPassword = document.getElementById('toggleSignupPassword');

const resetEmail = document.getElementById('resetEmail');
const resetNewPassword = document.getElementById('resetNewPassword');
const resetWhatsAppBtn = document.getElementById('resetWhatsAppBtn');
const resetError = document.getElementById('resetError');
const toggleResetPassword = document.getElementById('toggleResetPassword');

const profileIcon = document.getElementById('profileIcon');
const profileDropdown = document.getElementById('profileDropdown');
const profileLogoutBtn = document.getElementById('profileLogoutBtn');

const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const switchToReset = document.getElementById('switchToReset');
const switchToLoginFromReset = document.getElementById('switchToLoginFromReset');

const navLoginBtn = document.getElementById('navLoginBtn');
const navSubscribeBtn = document.getElementById('navSubscribeBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsModal = document.getElementById('closeSettingsModal');

// ============================================
// دوال النوافذ (UI Helpers)
// ============================================
function openAuthModal(form = 'login') {
    showForm(form);
    if (authModal) authModal.classList.add('active');
}

function closeAuthModalFunc() {
    if (authModal) authModal.classList.remove('active');
    clearErrors();
}

function showForm(form) {
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    resetForm.style.display = 'none';

    if (form === 'login') {
        loginForm.style.display = 'block';
        authModalTitle.textContent = 'تسجيل الدخول';
    } else if (form === 'signup') {
        signupForm.style.display = 'block';
        authModalTitle.textContent = 'إنشاء حساب';
    } else if (form === 'reset') {
        resetForm.style.display = 'block';
        authModalTitle.textContent = 'تغيير كلمة المرور';
    }
    clearErrors();
}

function clearErrors() {
    if (authError) authError.textContent = '';
    if (signupError) signupError.textContent = '';
    if (resetError) resetError.textContent = '';
}

function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    if (input && toggle) {
        toggle.addEventListener('click', function() {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            this.textContent = isPassword ? 'visibility_off' : 'visibility';
        });
    }
}

// ============================================
// الجهاز (Device ID) - ثابت مدى الحياة
// ============================================
function getDeviceId() {
    let deviceId = localStorage.getItem('zertiva_deviceId');
    if (!deviceId) {
        deviceId = crypto.randomUUID ? crypto.randomUUID() :
            'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                const r = Math.random() * 16 | 0;
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        localStorage.setItem('zertiva_deviceId', deviceId);
    }
    return deviceId;
}

// ============================================
// نظام الجلسة (Single Session)
// ============================================

/**
 * تحديث session.deviceId في Firestore (يُستدعى فقط عند تسجيل الدخول/إنشاء حساب)
 */
async function updateSessionInFirestore(uid, deviceId) {
    try {
        await db.collection('users').doc(uid).set({
            session: {
                deviceId: deviceId,
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            }
        }, { merge: true });
        console.log('✅ تم تحديث session.deviceId في Firestore:', deviceId);
        return true;
    } catch (error) {
        console.error('❌ فشل تحديث الجلسة في Firestore:', error);
        return false;
    }
}

/**
 * مسح الجلسة من Firestore (يُستدعى عند تسجيل الخروج)
 * لا يمسح deviceId من localStorage
 */
async function clearSessionInFirestore(uid) {
    if (!uid) return;
    try {
        await db.collection('users').doc(uid).set({
            session: {
                deviceId: null,
                lastSeen: null
            }
        }, { merge: true });
        console.log('🗑️ تم مسح الجلسة من Firestore');
    } catch (error) {
        console.error('❌ فشل مسح الجلسة من Firestore:', error);
    }
}

/**
 * فحص الجلسة (يُستدعى فقط عند تحميل الصفحة أو Refresh)
 * - يقارن deviceId في Firestore مع deviceId المحلي
 * - إذا اختلفا، يُسجل الخروج (باستثناء حالة تسجيل الدخول الجديد)
 */
async function checkSession() {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const docSnap = await db.collection('users').doc(user.uid).get();
        if (!docSnap.exists) {
            // المستند غير موجود: ننشئه مع الجهاز الحالي ونسجل الجلسة
            await createUserDocument(user);
            const deviceId = getDeviceId();
            await updateSessionInFirestore(user.uid, deviceId);
            await loadUserData();
            return;
        }

        const data = docSnap.data();
        const firestoreDeviceId = data.session?.deviceId || null;
        const localDeviceId = getDeviceId();

        if (firestoreDeviceId && firestoreDeviceId !== localDeviceId) {
            // جهاز آخر استخدم هذا الحساب → نسجل الخروج فوراً (لأنه Refresh)
            console.warn('⚠️ جهاز مختلف، تسجيل الخروج أثناء Refresh');
            await handleLogout();
            showToast('⚠️ تم تسجيل الدخول من جهاز آخر. تم تسجيل خروجك.', 'error');
            return;
        }

        // الجلسة صالحة، نفحص الاشتراك ونحدث الواجهة
        await checkAndUpdateSubscription(data);
        await loadUserData();

    } catch (error) {
        console.error('❌ خطأ في فحص الجلسة:', error);
        // في حالة خطأ، نسمح بالدخول (لا نطرد المستخدم)
        await loadUserData();
    }
}

/**
 * فحص الاشتراك وتحديثه إذا انتهت الصلاحية
 */
async function checkAndUpdateSubscription(userData) {
    const user = auth.currentUser;
    if (!user) return;

    const plan = userData.plan || 'free';
    const premiumUntil = userData.premiumUntil;

    if (plan === 'premium' && premiumUntil) {
        const now = Date.now();
        const expiry = new Date(premiumUntil).getTime();
        if (now > expiry) {
            await db.collection('users').doc(user.uid).update({
                plan: 'free',
                premiumUntil: null
            });
            console.log('⏰ تم تحويل الاشتراك إلى مجاني (انتهت الصلاحية)');
            showToast('⏰ انتهت صلاحية الاشتراك المميز، تم التحويل إلى مجاني.', 'info');
        }
    }
}

// ============================================
// إنشاء مستند المستخدم (أول مرة فقط)
// ============================================
async function createUserDocument(user, additionalData = {}) {
    try {
        const userRef = db.collection('users').doc(user.uid);
        const docSnap = await userRef.get();

        if (docSnap.exists) {
            // تحديث بيانات أساسية فقط
            await userRef.update({
                username: additionalData.username || user.email.split('@')[0] || 'مستخدم',
                firstname: additionalData.firstname || '',
                lastname: additionalData.lastname || '',
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        }

        const deviceId = getDeviceId();
        const userData = {
            email: user.email,
            username: additionalData.username || user.email.split('@')[0] || 'مستخدم',
            firstname: additionalData.firstname || '',
            lastname: additionalData.lastname || '',
            plan: 'free',
            premiumUntil: null,
            session: {
                deviceId: deviceId,
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        };

        await userRef.set(userData);
        console.log('✅ تم إنشاء مستند المستخدم في Firestore:', user.uid);
        return true;
    } catch (error) {
        console.error('❌ فشل إنشاء مستند المستخدم:', error);
        return false;
    }
}

// ============================================
// جلب بيانات المستخدم وتحديث الواجهة (مركزية)
// ============================================
let cachedUserData = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 دقائق

async function getUserData(forceRefresh = false) {
    const user = auth.currentUser;
    if (!user) return null;

    const now = Date.now();
    if (!forceRefresh && cachedUserData && (now - lastFetchTime) < CACHE_TTL) {
        return cachedUserData;
    }

    try {
        const docSnap = await db.collection('users').doc(user.uid).get();
        if (docSnap.exists) {
            cachedUserData = docSnap.data();
            lastFetchTime = now;
            return cachedUserData;
        } else {
            await createUserDocument(user);
            const newSnap = await db.collection('users').doc(user.uid).get();
            cachedUserData = newSnap.data();
            lastFetchTime = now;
            return cachedUserData;
        }
    } catch (error) {
        console.error('❌ خطأ في جلب بيانات المستخدم:', error);
        return cachedUserData || null;
    }
}

/**
 * دالة تحديث الواجهة بالكامل (تستدعي getUserData)
 */
async function loadUserData() {
    const user = auth.currentUser;
    const data = user ? await getUserData(true) : null;
    updateUI(user, data);
}

// ============================================
// تحديث واجهة المستخدم (UI)
// ============================================
function updateUI(user, data) {
    const profileEmail = document.getElementById('profileEmail');
    const profileExpiry = document.getElementById('profileExpiry');
    const profileStatus = document.getElementById('profileStatus');
    const profileUidValue = document.getElementById('profileUidValue');
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const navLoginBtn = document.getElementById('navLoginBtn');
    const navSubscribeBtn = document.getElementById('navSubscribeBtn');
    const featuresSubscribeBtn = document.getElementById('featuresSubscribeBtn');
    const profileIcon = document.getElementById('profileIcon');

    // حالة غير مسجل
    if (!user) {
        if (profileEmail) profileEmail.innerHTML = '👤 غير مسجل';
        if (profileExpiry) profileExpiry.textContent = 'الوصول محدود لبعض الامتحانات';
        if (profileStatus) profileStatus.innerHTML = '';
        if (profileUidValue) profileUidValue.textContent = '---';
        if (profileLogoutBtn) profileLogoutBtn.style.display = 'none';
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = 'inline-flex';
        if (profileIcon) profileIcon.style.display = 'none';

        // زر الترقية في القائمة المنسدلة (لغير المسجلين)
        const oldBtn = document.getElementById('dropdownUpgradeBtn');
        if (oldBtn) oldBtn.remove();
        if (profileDropdown) {
            const upgradeBtn = document.createElement('button');
            upgradeBtn.id = 'dropdownUpgradeBtn';
            upgradeBtn.innerHTML = 'الترقية إلى الحساب الكامل →';
            upgradeBtn.style.cssText = `
                margin-top: 12px;
                background: #64748B;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 25px;
                cursor: pointer;
                width: 100%;
                font-size: 13px;
                font-weight: bold;
                transition: all 0.3s ease;
            `;
            upgradeBtn.onclick = () => window.location.href = 'subscribe.html';
            profileDropdown.appendChild(upgradeBtn);
        }
        return;
    }

    // حالة مسجل
    if (profileEmail) profileEmail.innerHTML = `📧 ${user.email}`;
    if (profileUidValue) profileUidValue.textContent = user.uid;
    if (profileLogoutBtn) profileLogoutBtn.style.display = 'block';
    if (navLoginBtn) navLoginBtn.style.display = 'none';
    if (profileIcon) profileIcon.style.display = 'flex';

    const isPremium = data && data.plan === 'premium' &&
        data.premiumUntil && new Date(data.premiumUntil).getTime() > Date.now();

    // معلومات الاشتراك
    if (isPremium) {
        const expiry = new Date(data.premiumUntil);
        if (profileExpiry) profileExpiry.textContent = `📅 الصلاحية: حتى ${expiry.toLocaleDateString('en-US')}`;
        if (profileStatus) profileStatus.innerHTML = `<span class="status-premium">✅ مشترك (Pro)</span>`;
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'none';
        if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = 'none';
    } else {
        if (profileExpiry) profileExpiry.textContent = '⏰ انتهت الصلاحية أو مجاني';
        if (profileStatus) profileStatus.innerHTML = `<span class="status-free">📖 مجاني</span>`;
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = 'inline-flex';
    }

    // زر الترقية في القائمة المنسدلة
    const oldBtn = document.getElementById('dropdownUpgradeBtn');
    if (oldBtn) oldBtn.remove();
    if (!isPremium && profileDropdown) {
        const upgradeBtn = document.createElement('button');
        upgradeBtn.id = 'dropdownUpgradeBtn';
        upgradeBtn.innerHTML = 'الترقية إلى الحساب الكامل →';
        upgradeBtn.style.cssText = `
            margin-top: 12px;
            background: #64748B;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 25px;
            cursor: pointer;
            width: 100%;
            font-size: 13px;
            font-weight: bold;
            transition: all 0.3s ease;
        `;
        upgradeBtn.onclick = () => window.location.href = 'subscribe.html';
        profileDropdown.appendChild(upgradeBtn);
    }
}

// ============================================
// دوال المصادقة (Login, Signup, Logout, Reset)
// ============================================
async function handleLogin() {
    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (!email || !password) {
        authError.textContent = '⚠️ يرجى ملء جميع الحقول';
        return;
    }

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // تحديث الجلسة في Firestore (باستخدام deviceId الثابت)
        const deviceId = getDeviceId();
        await updateSessionInFirestore(user.uid, deviceId);

        // ننتظر قليلاً للتأكد من اكتمال الكتابة
        await new Promise(resolve => setTimeout(resolve, 150));

        closeAuthModalFunc();
        showToast('✅ تم تسجيل الدخول بنجاح. مرحباً بك!', 'success');

        // تحديث الواجهة (بدون فحص الجلسة)
        await loadUserData();

    } catch (error) {
        authError.textContent = getFirebaseErrorMessage(error.code);
    }
}

async function handleSignup() {
    const username = signupUsername.value.trim();
    const lastname = signupLastname.value.trim();
    const firstname = signupFirstname.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value;

    if (!username || !lastname || !firstname || !email || !password) {
        signupError.textContent = '⚠️ يرجى ملء جميع الحقول';
        return;
    }

    if (password.length < 6) {
        signupError.textContent = '⚠️ كلمة المرور يجب أن تكون 6 أحرف أو أكثر';
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        localStorage.setItem('userPass_' + user.uid, password);

        const deviceId = getDeviceId();
        await createUserDocument(user, { username, firstname, lastname });
        await updateSessionInFirestore(user.uid, deviceId);
        await new Promise(resolve => setTimeout(resolve, 150));

        closeAuthModalFunc();
        showToast('🎉 تم إنشاء الحساب بنجاح!', 'success');

        await loadUserData();

    } catch (error) {
        signupError.textContent = getFirebaseErrorMessage(error.code);
    }
}

async function handleReset() {
    const email = resetEmail.value.trim();
    const newPassword = resetNewPassword.value;

    if (!email || !newPassword) {
        resetError.textContent = '⚠️ يرجى ملء جميع الحقول';
        return;
    }

    if (newPassword.length < 6) {
        resetError.textContent = '⚠️ كلمة المرور يجب أن تكون 6 أحرف أو أكثر';
        return;
    }

    const message = `السلام عليكم،\nنسيت كلمة المرور وبغيت نبدلها.\nالبريد الإلكتروني: ${email}`;
    const waUrl = `https://wa.me/212687561491?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    closeAuthModalFunc();
    showToast('📱 تم فتح واتساب. أرسل رسالتك وسنقوم بمساعدتك.', 'info');
}

async function handleLogout() {
    try {
        const user = auth.currentUser;
        if (user) {
            await clearSessionInFirestore(user.uid);
        }
        await auth.signOut();
        if (profileDropdown) profileDropdown.classList.remove('show');
        showToast('👋 تم تسجيل الخروج بنجاح. نراكم قريباً!', 'success');
    } catch (error) {
        console.error(error);
        showToast('⚠️ حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.', 'error');
    }
}

// ============================================
// حالة المستخدم العامة (للاستخدام من ملفات أخرى)
// ============================================
window.getUserStatusGlobal = async function() {
    const user = auth.currentUser;
    if (!user) return 'guest';

    try {
        const data = await getUserData();
        if (data && data.plan === 'premium' && data.premiumUntil) {
            const expiry = new Date(data.premiumUntil).getTime();
            if (expiry > Date.now()) return 'premium';
        }
        return 'free';
    } catch {
        return 'free';
    }
};

// ============================================
// ترجمة أخطاء Firebase (محسنة)
// ============================================
function getFirebaseErrorMessage(code) {
    const errors = {
        'auth/user-not-found': '❌ لم يتم العثور على حساب بهذا البريد الإلكتروني.',
        'auth/wrong-password': '❌ كلمة المرور غير صحيحة. حاول مرة أخرى.',
        'auth/invalid-email': '❌ يرجى إدخال بريد إلكتروني صحيح.',
        'auth/user-disabled': '⚠️ هذا الحساب مُعطّل. يرجى التواصل مع الدعم.',
        'auth/too-many-requests': '⚠️ تم إرسال العديد من المحاولات الفاشلة. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.',
        'auth/email-already-in-use': '❌ يوجد حساب بهذا البريد الإلكتروني بالفعل. قم بتسجيل الدخول بدلاً من إنشاء حساب جديد.',
        'auth/weak-password': '⚠️ كلمة المرور ضعيفة. يجب أن تتكون من 6 أحرف على الأقل.',
        'auth/operation-not-allowed': '⚠️ إنشاء الحساب غير متاح حالياً. يرجى المحاولة لاحقاً.',
        'auth/network-request-failed': '⚠️ فشل الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.',
        'auth/internal-error': '⚠️ حدث خطأ داخلي. يرجى المحاولة مرة أخرى.',
        'auth/invalid-credential': '❌ بيانات الدخول غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.',
        'auth/invalid-login-credentials': '❌ البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        'auth/requires-recent-login': '⚠️ يُرجى تسجيل الدخول مرة أخرى لتأكيد هويتك.'
    };
    return errors[code] || '⚠️ حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
}

// ============================================
// Toast Notifications (محسّن)
// ============================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        padding: 14px 24px;
        border-radius: 12px;
        background: #0f172a;
        color: white;
        border: 1px solid rgba(56,189,248,0.2);
        z-index: 99999;
        font-size: 15px;
        font-weight: 500;
        box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        animation: slideIn 0.3s ease;
        direction: rtl;
        max-width: 420px;
        line-height: 1.5;
    `;
    if (type === 'success') toast.style.borderColor = '#22c55e';
    if (type === 'error') toast.style.borderColor = '#ef4444';
    if (type === 'info') toast.style.borderColor = '#38bdf8';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ============================================
// مراقب حالة المستخدم (محسّن - بدون فحص الجلسة)
// ============================================
auth.onAuthStateChanged(async user => {
    if (user) {
        // فقط إذا كانت الصفحة تُحمّل (أي أننا لسنا في عملية تسجيل دخول جديدة)
        // نفحص الجلسة، ولكننا نستخدم علامة sessionChecked لتجنب التكرار
        if (!window._sessionChecked) {
            window._sessionChecked = true;
            await checkSession();
        } else {
            // إذا كانت الجلسة قد فُحصت مسبقاً (مثل بعد Login)، نحدّث الواجهة فقط
            await loadUserData();
        }
    } else {
        // المستخدم غير مسجل
        updateUI(null, null);
    }
});

// ============================================
// ربط الأحداث (DOMContentLoaded)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // ربط دوال إظهار/إخفاء كلمة المرور
    togglePasswordVisibility('authPassword', 'togglePassword');
    togglePasswordVisibility('signupPassword', 'toggleSignupPassword');
    togglePasswordVisibility('resetNewPassword', 'toggleResetPassword');

    // نوافذ المصادقة
    if (navLoginBtn) navLoginBtn.addEventListener('click', () => openAuthModal('login'));
    if (closeAuthModal) closeAuthModal.addEventListener('click', closeAuthModalFunc);
    if (authModal) authModal.addEventListener('click', (e) => { if (e.target === authModal) closeAuthModalFunc(); });

    if (authLoginBtn) authLoginBtn.addEventListener('click', handleLogin);
    if (authSignupBtn) authSignupBtn.addEventListener('click', handleSignup);
    if (resetWhatsAppBtn) resetWhatsAppBtn.addEventListener('click', handleReset);

    if (switchToSignup) switchToSignup.addEventListener('click', () => showForm('signup'));
    if (switchToLogin) switchToLogin.addEventListener('click', () => showForm('login'));
    if (switchToReset) switchToReset.addEventListener('click', () => showForm('reset'));
    if (switchToLoginFromReset) switchToLoginFromReset.addEventListener('click', () => showForm('login'));

    // الملف الشخصي
    if (profileIcon) profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileDropdown) profileDropdown.classList.toggle('show');
    });

    if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', handleLogout);

    // إعدادات العرض
    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsModal.classList.add('active');
            if (profileDropdown) profileDropdown.classList.remove('show');
        });
    }
    if (closeSettingsModal) {
        closeSettingsModal.addEventListener('click', () => settingsModal.classList.remove('active'));
    }
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) settingsModal.classList.remove('active');
        });
    }

    // أزرار الاشتراك
    const navSubscribeBtn = document.getElementById('navSubscribeBtn');
    if (navSubscribeBtn) {
        navSubscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'subscribe.html';
        });
        console.log('✅ زر اشترك (navSubscribeBtn) مربوط');
    }

    const featuresSubscribeBtn = document.getElementById('featuresSubscribeBtn');
    if (featuresSubscribeBtn) {
        featuresSubscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'subscribe.html';
        });
        console.log('✅ زر اشترك (featuresSubscribeBtn) مربوط');
    }

    // إغلاق القائمة المنسدلة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileIcon) {
            profileDropdown.classList.remove('show');
        }
    });

    // تحميل الواجهة عند بدء الصفحة
    setTimeout(loadUserData, 500);
});

console.log('✅ auth.js (النسخة الاحترافية - Single Session مستقر) تم تحميله بنجاح');
