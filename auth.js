// ============================================
// auth.js - نظام المصادقة مع Firebase + Firestore
// (نسخة معدلة: Single Session + فحص عند Refresh فقط)
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

// عناصر تسجيل الدخول
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authLoginBtn = document.getElementById('authLoginBtn');
const authError = document.getElementById('authError');
const togglePassword = document.getElementById('togglePassword');

// عناصر إنشاء حساب
const signupUsername = document.getElementById('signupUsername');
const signupLastname = document.getElementById('signupLastname');
const signupFirstname = document.getElementById('signupFirstname');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const authSignupBtn = document.getElementById('authSignupBtn');
const signupError = document.getElementById('signupError');
const toggleSignupPassword = document.getElementById('toggleSignupPassword');

// عناصر نسيت كلمة المرور
const resetEmail = document.getElementById('resetEmail');
const resetNewPassword = document.getElementById('resetNewPassword');
const resetWhatsAppBtn = document.getElementById('resetWhatsAppBtn');
const resetError = document.getElementById('resetError');
const toggleResetPassword = document.getElementById('toggleResetPassword');

// ============================================
// ✅ عناصر الملف الشخصي (التصميم القديم)
// ============================================
const profileIcon = document.getElementById('profileIcon');
const profileDropdown = document.getElementById('profileDropdown');
const profileLogoutBtn = document.getElementById('profileLogoutBtn');

// أزرار التنقل بين النماذج
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const switchToReset = document.getElementById('switchToReset');
const switchToLoginFromReset = document.getElementById('switchToLoginFromReset');

// عناصر أخرى
const navLoginBtn = document.getElementById('navLoginBtn');
const navSubscribeBtn = document.getElementById('navSubscribeBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsModal = document.getElementById('closeSettingsModal');

// ============================================
// دالة إظهار/إخفاء كلمة المرور (مضافة)
// ============================================
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
// ═══════════════════════════════════════════════
//      نظام الجلسة الجديد (Single Session)
// ═══════════════════════════════════════════════
// ============================================

/**
 * توليد معرف جهاز فريد (deviceId) وحفظه في localStorage
 * يستخدم مرة واحدة فقط عند أول تسجيل دخول أو عند إنشاء الحساب
 * المفتاح: zertiva_deviceId
 */
function generateDeviceId() {
    let deviceId;
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        deviceId = crypto.randomUUID();
    } else {
        deviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    localStorage.setItem('zertiva_deviceId', deviceId);
    return deviceId;
}

/**
 * استرجاع deviceId من localStorage
 * إذا لم يكن موجوداً، يتم إنشاء واحد جديد تلقائياً (للحفاظ على الثبات)
 */
function getDeviceId() {
    let deviceId = localStorage.getItem('zertiva_deviceId');
    if (!deviceId) {
        deviceId = generateDeviceId();
    }
    return deviceId;
}

/**
 * تحديث جهاز الجلسة في Firestore (حقل session.deviceId)
 * تُستدعى فقط عند تسجيل الدخول أو إنشاء حساب جديد
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
 * مسح بيانات الجلسة من localStorage وFirestore
 * تُستدعى عند تسجيل الخروج
 */
async function clearSession(uid) {
    localStorage.removeItem('zertiva_deviceId');
    if (uid) {
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
}

/**
 * فحص الجلسة عند تحميل الصفحة (Refresh فقط)
 * - يقرأ deviceId من Firestore ويقارنه مع الجهاز
 * - إذا اختلف → تسجيل خروج فوري
 * - إذا تطابق → يستمر، ويقوم بفحص الاشتراك وتحديثه إذا انتهى
 */
async function checkSessionOnLoad() {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const docRef = db.collection('users').doc(user.uid);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            // المستند غير موجود: ننشئه مع الجهاز الحالي ونعتبر الجلسة صالحة
            await createUserDocument(user);
            const deviceId = getDeviceId();
            await updateSessionInFirestore(user.uid, deviceId);
            await updateProfile();
            return;
        }

        const data = docSnap.data();
        const firestoreDeviceId = data.session?.deviceId || null;
        const localDeviceId = getDeviceId(); // يضمن وجود deviceId

        // ========== مقارنة الأجهزة ==========
        if (firestoreDeviceId !== localDeviceId) {
            // جهاز آخر دخل بهذا الحساب → تسجيل خروج
            console.warn('⚠️ جهاز مختلف، يتم تسجيل الخروج');
            await handleLogout();
            showToast('⚠️ تم تسجيل الدخول من جهاز آخر، تم تسجيل خروجك.', 'error');
            return;
        }

        // ========== فحص الاشتراك (مرة واحدة عند الـ Refresh) ==========
        await checkAndUpdateSubscription(data);

        // تحديث الواجهة
        await updateProfile();

    } catch (error) {
        console.error('❌ خطأ في فحص الجلسة:', error);
        // في حالة خطأ، نسمح بالدخول (لا نطرد المستخدم)
        await updateProfile();
    }
}

/**
 * فحص الاشتراك وتحديثه إذا انتهت صلاحيته
 * تُستدعى فقط من checkSessionOnLoad (مرة واحدة عند الـ Refresh)
 */
async function checkAndUpdateSubscription(userData) {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const currentPlan = userData.plan || 'free';
        const premiumUntil = userData.premiumUntil; // تاريخ الانتهاء (timestamp أو string)

        // إذا كان الاشتراك ممتازاً ولديه تاريخ انتهاء
        if (currentPlan === 'premium' && premiumUntil) {
            const now = Date.now();
            const expiry = new Date(premiumUntil).getTime();

            if (now > expiry) {
                // الاشتراك انتهى → تحويل إلى free
                await db.collection('users').doc(user.uid).update({
                    plan: 'free',
                    premiumUntil: null
                });
                console.log('⏰ تم تحويل الاشتراك إلى مجاني (انتهت الصلاحية)');
                showToast('⏰ انتهت صلاحية الاشتراك المميز، تم التحويل إلى مجاني.', 'info');
            }
        }
    } catch (error) {
        console.error('❌ فشل فحص الاشتراك:', error);
    }
}

// ============================================
// 🔧 دالة إنشاء مستند المستخدم في Firestore (معدلة)
// ============================================
async function createUserDocument(user, additionalData = {}) {
    try {
        const userRef = db.collection('users').doc(user.uid);
        const docSnap = await userRef.get();

        if (docSnap.exists) {
            console.log('📝 المستند موجود، تحديث البيانات الأساسية فقط');
            await userRef.update({
                username: additionalData.username || user.email.split('@')[0] || 'مستخدم',
                firstname: additionalData.firstname || '',
                lastname: additionalData.lastname || '',
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        }

        const deviceId = getDeviceId(); // يضمن وجود deviceId

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
// 🔧 دالة جلب حالة المستخدم (قراءة فقط - لا كتابة)
// ============================================
window.getUserStatusGlobal = async function() {
    const user = auth.currentUser;
    if (!user) return 'guest';

    try {
        const docRef = db.collection('users').doc(user.uid);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();

            if (data.plan === 'premium' && data.premiumUntil) {
                const now = Date.now();
                const expiry = new Date(data.premiumUntil).getTime();
                if (now <= expiry) {
                    return 'premium';
                }
            }
            return 'free';
        } else {
            await createUserDocument(user);
            return 'free';
        }
    } catch (error) {
        console.error('❌ خطأ في جلب حالة المستخدم:', error);
        return 'free';
    }
};

// ============================================
// دوال المصادقة (معدلة لتضم تحديث الجلسة)
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

        // ✅ إنشاء أو استرجاع deviceId وتحديثه في Firestore
        const deviceId = getDeviceId();
        await updateSessionInFirestore(user.uid, deviceId);

        closeAuthModalFunc();
        showToast('✅ تم تسجيل الدخول بنجاح', 'success');

        // ✅ تحديث الملف الشخصي
        setTimeout(updateProfile, 500);

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

        // ✅ إنشاء المستند مع deviceId
        const deviceId = getDeviceId();
        await createUserDocument(user, { username, firstname, lastname });
        await updateSessionInFirestore(user.uid, deviceId);

        closeAuthModalFunc();
        showToast('✅ تم إنشاء الحساب بنجاح', 'success');

        setTimeout(updateProfile, 500);

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
    showToast(' تم فتح واتساب', 'info');
}

async function handleLogout() {
    try {
        const user = auth.currentUser;
        if (user) {
            await clearSession(user.uid);
        } else {
            localStorage.removeItem('zertiva_deviceId');
        }
        await auth.signOut();
        if (profileDropdown) profileDropdown.classList.remove('show');
        showToast('✅ تم تسجيل الخروج بنجاح', 'success');
    } catch (error) {
        console.error(error);
    }
}

// ============================================
// دالة ترجمة أخطاء Firebase
// ============================================
function getFirebaseErrorMessage(code) {
    const errors = {
        'auth/user-not-found': '❌ البريد الإلكتروني غير مسجل',
        'auth/wrong-password': '❌ كلمة السر غير صحيحة',
        'auth/email-already-in-use': '❌ البريد الإلكتروني مستخدم بالفعل',
        'auth/invalid-email': '❌ البريد الإلكتروني غير صحيح',
        'auth/too-many-requests': '⚠️ حاول مرة أخرى لاحقاً',
        'auth/weak-password': '⚠️ كلمة المرور ضعيفة (6 أحرف على الأقل)'
    };
    return errors[code] || '⚠️ حدث خطأ، حاول مرة أخرى';
}

// ============================================
// عرض Toast
// ============================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        padding: 12px 20px; border-radius: 12px;
        background: #0f172a; color: white;
        border: 1px solid rgba(56,189,248,0.2);
        z-index: 99999;
        font-size: 14px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        direction: rtl;
        max-width: 380px;
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
    }, 3000);
}

// ============================================
// ✅ تحديث الملف الشخصي (محسن مع قراءة الاشتراك من المستند)
// ============================================
async function updateProfile() {
    const user = auth.currentUser;

    const profileEmail = document.getElementById('profileEmail');
    const profileExpiry = document.getElementById('profileExpiry');
    const profileStatus = document.getElementById('profileStatus');
    const profileUidValue = document.getElementById('profileUidValue');
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const navLoginBtn = document.getElementById('navLoginBtn');
    const navSubscribeBtn = document.getElementById('navSubscribeBtn');
    const profileIcon = document.getElementById('profileIcon');

    if (!user) {
        if (profileEmail) profileEmail.innerHTML = '👤 غير مسجل';
        if (profileExpiry) profileExpiry.textContent = 'الوصول محدود لبعض الامتحانات';
        if (profileStatus) profileStatus.innerHTML = '';
        if (profileUidValue) profileUidValue.textContent = '---';
        if (profileLogoutBtn) profileLogoutBtn.style.display = 'none';
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        if (profileIcon) profileIcon.style.display = 'none';

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

    try {
        const doc = await db.collection('users').doc(user.uid).get();
        const data = doc.exists ? doc.data() : {};

        if (profileEmail) profileEmail.innerHTML = `📧 ${user.email}`;

        const isPremium = data.plan === 'premium' && data.premiumUntil && new Date(data.premiumUntil).getTime() > Date.now();

        if (isPremium) {
            const expiry = new Date(data.premiumUntil);
            if (profileExpiry) profileExpiry.textContent = `📅 الصلاحية: حتى ${expiry.toLocaleDateString('en-US')}`;
            if (profileStatus) profileStatus.innerHTML = `<span class="status-premium">✅ مشترك (Pro)</span>`;
            if (navSubscribeBtn) navSubscribeBtn.style.display = 'none';
        } else {
            if (profileExpiry) profileExpiry.textContent = '⏰ انتهت الصلاحية أو مجاني';
            if (profileStatus) profileStatus.innerHTML = `<span class="status-free">📖 مجاني</span>`;
            if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        }

        if (profileUidValue) profileUidValue.textContent = user.uid;

        if (profileLogoutBtn) profileLogoutBtn.style.display = 'block';
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'flex';

        const oldBtn = document.getElementById('dropdownUpgradeBtn');
        if (oldBtn) oldBtn.remove();

        // إذا كان مجانياً، نضيف زر الترقية
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

    } catch (error) {
        console.error('خطأ في تحديث الملف الشخصي:', error);
    }
}

// ============================================
// مراقب حالة المستخدم (محسن)
// ============================================
auth.onAuthStateChanged(async user => {
    if (user) {
        // ✅ التحقق من الجلسة عند كل تحميل (Refresh)
        await checkSessionOnLoad();

        // ✅ تحديث واجهة المستخدم
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'flex';

        // تحديث زر الاشتراك بناءً على الحالة
        const status = await window.getUserStatusGlobal();
        if (navSubscribeBtn) {
            navSubscribeBtn.style.display = (status === 'premium') ? 'none' : 'inline-flex';
        }

        // تحديث الملف الشخصي (مرة أخرى للتأكد)
        await updateProfile();

    } else {
        // ✅ المستخدم غير مسجل
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (profileIcon) profileIcon.style.display = 'flex';
        if (profileDropdown) profileDropdown.classList.remove('show');
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';

        await updateProfile();
    }
});

// ============================================
// ربط الأحداث
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    togglePasswordVisibility('authPassword', 'togglePassword');
    togglePasswordVisibility('signupPassword', 'toggleSignupPassword');
    togglePasswordVisibility('resetNewPassword', 'toggleResetPassword');

    // ===== نوافذ المصادقة =====
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

    // ===== الملف الشخصي =====
    if (profileIcon) profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileDropdown) profileDropdown.classList.toggle('show');
    });

    if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', handleLogout);

    // ===== إعدادات العرض =====
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

    // ============================================
    // ✅ أزرار الاشتراك - توجيه إلى subscribe.html
    // ============================================
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

    // ===== إغلاق القائمة المنسدلة عند النقر خارجها =====
    document.addEventListener('click', (e) => {
        if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileIcon) {
            profileDropdown.classList.remove('show');
        }
    });

    // ===== تحميل الملف الشخصي عند بدء الصفحة =====
    setTimeout(updateProfile, 500);
});

console.log('✅ auth.js (النظام الجديد مع الجلسات المحسنة - Single Session) تم تحميله بنجاح');
