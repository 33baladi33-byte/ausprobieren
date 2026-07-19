// ============================================
// auth.js - النظام النهائي المعتمد للمصادقة (Zertiva Gold Standard)
// (قراءة واحدة عند الـ Refresh - آمن 100% - حماية كاملة من الحسابات الناقصة)
// ============================================

// عناصر DOM
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

// راية الحماية لمنع الـ Race Condition أثناء الدخول أو الإنشاء العمدي
window._isAuthenticating = false; 

// ============================================
// ✅ الحالة العامة للمستخدم (Single Source of Truth)
// ============================================

// متغير يحمل الحالة الحالية (يتم تحديثه في updateUI)
let _currentUserStatus = 'free';

/**
 * دالة عامة تعيد حالة المستخدم الحالية
 * هذه هي الدالة الوحيدة التي تستخدمها بقية التطبيق (exams.js)
 */
window.getUserStatusGlobal = function() {
    return _currentUserStatus;
};

// ============================================
// دوال النوافذ والواجهات (UI Helpers)
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
    if (!loginForm || !signupForm || !resetForm) return;
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    resetForm.style.display = 'none';

    if (form === 'login') {
        loginForm.style.display = 'block';
        if (authModalTitle) authModalTitle.textContent = 'تسجيل الدخول';
    } else if (form === 'signup') {
        signupForm.style.display = 'block';
        if (authModalTitle) authModalTitle.textContent = 'إنشاء حساب';
    } else if (form === 'reset') {
        resetForm.style.display = 'block';
        if (authModalTitle) authModalTitle.textContent = 'تغيير كلمة المرور';
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
// معرف الجهاز الثابت (Device ID)
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
// نظام الجلسة المركزي عند الـ Refresh (التحليل الذكي لقراءة واحدة)
// ============================================
async function checkSessionAndInitialize() {
    const user = auth.currentUser;
    if (!user) {
        updateUI(null, null);
        return;
    }

    // إذا كان المستخدم في خضم عملية تسجيل دخول أو إنشاء حساب جديدة، نخرج لمنع التعارض
    if (window._isAuthenticating) return;

    try {
        const docRef = db.collection('users').doc(user.uid);
        const docSnap = await docRef.get(); // [قراءة واحدة فقط]

        if (!docSnap.exists) {
            // مستند طارئ غير موجود، ننشئه بالبيانات الكاملة
            const defaultData = await createInitialUserDocument(user);
            updateUI(user, defaultData);
            return;
        }

        let userData = docSnap.data();
        const localDeviceId = getDeviceId();
        const firestoreDeviceId = userData.session?.deviceId || null;

        // 1) فحص تطابق الجهاز (عند الطرد بسبب جهاز آخر: لا نلمس Firestore إطلاقاً)
        if (firestoreDeviceId && firestoreDeviceId !== localDeviceId) {
            console.warn('⚠️ تم رصد جهاز رسمي آخر. يتم الطرد الفوري محلياً...');
            await auth.signOut(); // تسجيل خروج نقي بدون إشارات للشبكة أو مسح البيانات المحلية
            updateUI(null, null);
            showToast('⚠️ تم تسجيل الدخول من جهاز آخر. تم تسجيل خروجك تلقائياً لحماية الحساب.', 'error');
            return;
        }

        // 2) فحص انتهاء صلاحية الاشتراك (يحدث مرة واحدة فقط عند انتهاء المدة فعلياً)
        if (userData.plan === 'premium' && userData.premiumUntil) {
            const now = Date.now();
            const expiry = new Date(userData.premiumUntil).getTime();

            if (now > expiry) {
                console.log('⏰ انتهت مدة الصلاحية. تحويل الخطة إلى مجانية...');
                userData.plan = 'free';
                userData.premiumUntil = null;
                
                await docRef.update({
                    plan: 'free',
                    premiumUntil: null,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                showToast('⏰ انتهت صلاحية اشتراكك المميز، تم تحويل الحساب إلى الخطة المجانية.', 'info');
            }
        }

        // 3) تحديث الواجهة مباشرة بالبيانات الجاهزة
        updateUI(user, userData);

    } catch (error) {
        console.error('❌ خطأ في فحص الجلسة عند التحميل:', error);
        updateUI(user, { plan: 'free' });
    }
}

// دالة مساعدة لإنشاء مستند للمستخدم في الحالات الاستثنائية
async function createInitialUserDocument(user) {
    const deviceId = getDeviceId();
    const data = {
        email: user.email,
        username: user.email.split('@')[0] || 'مستخدم',
        firstname: '',
        lastname: '',
        plan: 'free',
        premiumUntil: null,
        session: { 
            deviceId: deviceId, 
            loginAt: firebase.firestore.FieldValue.serverTimestamp() 
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    await db.collection('users').doc(user.uid).set(data);
    return data;
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

    // حالة زائر غير مسجل
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
        
        const oldBtn = document.getElementById('dropdownUpgradeBtn');
        if (oldBtn) oldBtn.remove();

        // ✅ تحديث الحالة العامة عند عدم وجود مستخدم
        _currentUserStatus = 'free';
        return;
    }

    // حالة مستخدم مسجل
    if (profileEmail) profileEmail.innerHTML = `📧 ${user.email}`;
    if (profileUidValue) profileUidValue.textContent = user.uid;
    if (profileLogoutBtn) profileLogoutBtn.style.display = 'block';
    if (navLoginBtn) navLoginBtn.style.display = 'none';
    if (profileIcon) profileIcon.style.display = 'flex';

    // حساب حالة الاشتراك مرة واحدة بدقة (الحساب الفعلي لـ isPremium)
    const isPremium = data && data.plan === 'premium' && 
                      (!data.premiumUntil || new Date(data.premiumUntil).getTime() > Date.now());

    // ✅ تحديث الحالة العامة
    _currentUserStatus = isPremium ? 'premium' : 'free';

    if (isPremium) {
        if (profileStatus) profileStatus.innerHTML = `<span class="status-premium">✅ مشترك (Pro)</span>`;
        if (profileExpiry && data.premiumUntil) {
            profileExpiry.textContent = `📅 الصلاحية: حتى ${new Date(data.premiumUntil).toLocaleDateString('ar-EG')}`;
        } else if (profileExpiry) {
            profileExpiry.textContent = `📅 الصلاحية: حساب دائم`;
        }
        
        // إخفاء خيارات الاشتراك تماماً من كامل الموقع للمشتركين
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'none';
        if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = 'none';
        
        const oldBtn = document.getElementById('dropdownUpgradeBtn');
        if (oldBtn) oldBtn.remove();
    } else {
        if (profileStatus) profileStatus.innerHTML = `<span class="status-free">📖 مجاني</span>`;
        if (profileExpiry) profileExpiry.textContent = '⏰ حساب مجاني / انتهت الصلاحية';
        
        // إظهار خيارات الاشتراك للمستخدم المجاني
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = 'inline-flex';

        const oldBtn = document.getElementById('dropdownUpgradeBtn');
        if (!oldBtn && profileDropdown) {
            const upgradeBtn = document.createElement('button');
            upgradeBtn.id = 'dropdownUpgradeBtn';
            upgradeBtn.innerHTML = 'الترقية إلى الحساب الكامل →';
            upgradeBtn.style.cssText = `
                margin-top: 12px; background: #64748B; color: white; border: none;
                padding: 10px 15px; border-radius: 25px; cursor: pointer; width: 100%;
                font-size: 13px; font-weight: bold; transition: all 0.3s ease;
            `;
            upgradeBtn.onclick = () => window.location.href = 'subscribe.html';
            profileDropdown.appendChild(upgradeBtn);
        }
    }
}
async function handleLogin() {
    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (!email || !password) {
        authError.textContent = ' يرجى ملء جميع الحقول';
        return;
    }

    // ✅ إظهار مؤشر التحميل الدائري على الزر
    const originalText = authLoginBtn.innerHTML;
    authLoginBtn.disabled = true;
    authLoginBtn.innerHTML = '<span class="loading-spinner"></span>';
    authLoginBtn.style.opacity = '0.7';

    window._isAuthenticating = true; 

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const deviceId = getDeviceId();

        const userRef = db.collection('users').doc(user.uid);
        
        await userRef.set({
            session: {
                deviceId: deviceId,
                loginAt: firebase.firestore.FieldValue.serverTimestamp()
            },
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        const finalSnap = await userRef.get();
        
        closeAuthModalFunc();
        showToast('✅ تم تسجيل الدخول بنجاح. مرحباً بك!', 'success');
        updateUI(user, finalSnap.data());

    } catch (error) {
        authError.textContent = getFirebaseErrorMessage(error.code);
    } finally {
        window._isAuthenticating = false;
        // ✅ إعادة الزر إلى حالته الأصلية
        authLoginBtn.disabled = false;
        authLoginBtn.innerHTML = originalText;
        authLoginBtn.style.opacity = '1';
    }
}
async function handleSignup() {
    const username = signupUsername.value.trim();
    const lastname = signupLastname.value.trim();
    const firstname = signupFirstname.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value;

    if (!username || !lastname || !firstname || !email || !password) {
        signupError.textContent = ' يرجى ملء جميع الخانات';
        return;
    }

    // ✅ إظهار مؤشر التحميل الدائري على الزر
    const originalText = authSignupBtn.innerHTML;
    authSignupBtn.disabled = true;
    authSignupBtn.innerHTML = '<span class="loading-spinner"></span>';
    authSignupBtn.style.opacity = '0.7';

    window._isAuthenticating = true;
    let createdUser = null;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        createdUser = userCredential.user;
        const deviceId = getDeviceId();

        const userData = {
            email: email,
            username: username,
            firstname: firstname,
            lastname: lastname,
            plan: 'free',
            premiumUntil: null,
            session: {
                deviceId: deviceId,
                loginAt: firebase.firestore.FieldValue.serverTimestamp()
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('users').doc(createdUser.uid).set(userData);

        closeAuthModalFunc();
        showToast('🎉 تم إنشاء الحساب بنجاح ومرحباً بك معنا!', 'success');
        updateUI(createdUser, userData);

    } catch (error) {
        if (createdUser) {
            console.warn('⚠️ فشل إنشاء مستند Firestore، يتم حذف الحساب من Auth تراجعاً عن الخطأ...');
            try { await createdUser.delete(); } catch(e) { console.error('فشل حذف حساب الـ Auth المعلق:', e); }
        }
        signupError.textContent = getFirebaseErrorMessage(error.code);
    } finally {
        window._isAuthenticating = false;
        // ✅ إعادة الزر إلى حالته الأصلية
        authSignupBtn.disabled = false;
        authSignupBtn.innerHTML = originalText;
        authSignupBtn.style.opacity = '1';
    }
}

async function handleLogout(clearLocalDevice = true) {
    try {
        const user = auth.currentUser;
        
        // خروج يدوي نظامي بناءً على رغبة المستخدم
        if (clearLocalDevice) {
            if (user) {
                // تصفير الجلسة في السيرفر فقط إذا كان الخروج يدوياً
                await db.collection('users').doc(user.uid).set({
                    session: { deviceId: null, loginAt: null },
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            }
            localStorage.removeItem('zertiva_deviceId'); // حذف الـ ID المحلي
        }
        
        await auth.signOut();
        if (profileDropdown) profileDropdown.classList.remove('show');
        showToast('👋 تم تسجيل الخروج بنجاح.', 'success');
        updateUI(null, null);
    } catch (error) {
        console.error('Logout Error:', error);
        await auth.signOut(); 
    }
}

async function handleReset() {
    const email = resetEmail.value.trim();
    const newPassword = resetNewPassword.value;

    if (!email || !newPassword) {
        resetError.textContent = '⚠️ يرجى ملء جميع الحقول';
        return;
    }

    const message = `السلام عليكم،\nنسيت كلمة المرور وبغيت نبدلها.\nالبريد الإلكتروني: ${email}`;
    const waUrl = `https://wa.me/212687561491?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    closeAuthModalFunc();
    showToast('📱 تم فتح واتساب. أرسل رسالتك وسنقوم بمساعدتك.', 'info');
}

// ============================================
// معالجة وترجمة أخطاء Firebase بدقة عالية
// ============================================
function getFirebaseErrorMessage(code) {
    const errors = {
        'auth/user-not-found': ' لا يوجد حساب بهذا البريد الإلكتروني.',
        'auth/invalid-credential': ' البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        'auth/wrong-password': ' كلمة المرور غير صحيحة.',
        'auth/invalid-email': ' البريد الإلكتروني غير صالح.',
        'auth/email-already-in-use': ' هذا البريد الإلكتروني مستخدم بالفعل.',
        'auth/weak-password': ' كلمة المرور قصيرة جداً (يجب ألا تقل عن 6 أحرف).',
        'auth/network-request-failed': ' تحقق من اتصال الإنترنت الخاص بك.',
        'auth/too-many-requests': ' محاولات كثيرة خاطئة ومتتالية. يرجى الانتظار قليلاً لحماية حسابك.'
    };
    return errors[code] || ' حدث خطأ غير متوقع أثناء معالجة البيانات، يرجى المحاولة لاحقاً.';
}

// ============================================
// Toast Notifications
// ============================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; padding: 14px 24px; border-radius: 12px;
        background: #0f172a; color: white; border: 1px solid rgba(56,189,248,0.2);
        z-index: 99999; font-size: 15px; font-weight: 500; box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        direction: rtl; max-width: 420px; line-height: 1.5;
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
// مراقب حالة المصادقة المركزي من Firebase
// ============================================
auth.onAuthStateChanged(async user => {
    await checkSessionAndInitialize();
});

document.addEventListener('DOMContentLoaded', function() {
    togglePasswordVisibility('authPassword', 'togglePassword');
    togglePasswordVisibility('signupPassword', 'toggleSignupPassword');
    togglePasswordVisibility('resetNewPassword', 'toggleResetPassword');

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

    if (profileIcon) profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileDropdown) profileDropdown.classList.toggle('show');
    });

    if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', () => handleLogout(true));

    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsModal.classList.add('active');
            if (profileDropdown) profileDropdown.classList.remove('show');
        });
    }
    if (closeSettingsModal) closeSettingsModal.addEventListener('click', () => settingsModal.classList.remove('active'));
    
    document.addEventListener('click', (e) => {
        if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileIcon) {
            profileDropdown.classList.remove('show');
        }
    });

    // ✅ التعديل الثاني: جعل زر Enter يعمل كضغط على الزر المناسب
    // في نموذج تسجيل الدخول
    const loginInputs = [authEmail, authPassword];
    loginInputs.forEach(input => {
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (authLoginBtn && !authLoginBtn.disabled) {
                        authLoginBtn.click();
                    }
                }
            });
        }
    });

    // في نموذج إنشاء الحساب
    const signupInputs = [signupUsername, signupLastname, signupFirstname, signupEmail, signupPassword];
    signupInputs.forEach(input => {
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (authSignupBtn && !authSignupBtn.disabled) {
                        authSignupBtn.click();
                    }
                }
            });
        }
    });
});

console.log('🎉 تم اعتماد البنية النهائية لـ Zertiva بنسبة 100/100.');
