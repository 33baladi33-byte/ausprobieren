// ============================================
// auth.js - النظام النهائي المعتمد للمصادقة (Zertiva Gold Standard)
// (قراءة واحدة عند الـ Refresh - آمن 100% - حماية كاملة من الحسابات الناقصة)
// مع ميزة "تقريري" (صفحة HTML منفصلة)
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

// مخبأ لبيانات المستخدم من Firestore (يتم تحديثه في updateUI)
window._cachedUserData = null;

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
        closeAuthModalFunc();
        showToast('✅ تم تسجيل الدخول بنجاح. مرحباً بك!', 'success');
        updateUI(user, finalSnap.data());
        
        // ربط OneSignal بمستخدم مسجل
        if (typeof OneSignal !== 'undefined' && OneSignal.User) {
            try {
                await OneSignal.User.login(user.uid);
                console.log('✅ OneSignal: تم ربط المستخدم');
            } catch(e) {
                console.warn('⚠️ OneSignal: فشل ربط المستخدم', e);
            }
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

        // 2.5) فحص انتهاء صلاحية Study Plan (نفس المنطق)
        if (userData.studyPlan === true && userData.studyPlanUntil) {
            const now = Date.now();
            const expiry = new Date(userData.studyPlanUntil).getTime();

            if (now > expiry) {
                console.log('⏰ انتهت صلاحية الخطة اليومية. إلغاء التفعيل...');
                userData.studyPlan = false;
                userData.studyPlanUntil = null;
                
                await docRef.update({
                    studyPlan: false,
                    studyPlanUntil: null,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                showToast('⏰ انتهت صلاحية الخطة اليومية، تم إلغاء التفعيل.', 'info');
            }
        }

        // 3) تحديث الواجهة مباشرة بالبيانات الجاهزة
        updateUI(user, userData);

    } catch (error) {
        console.error('❌ خطأ في فحص الجلسة عند التحميل:', error);
        updateUI(user, { plan: 'free' });
    }
}

async function createInitialUserDocument(user) {
    const deviceId = getDeviceId();
    const data = {
        email: user.email,
        username: user.email.split('@')[0] || 'مستخدم',
        firstname: '',
        lastname: '',
        plan: 'free',
        premiumUntil: null,
        studyPlan: false,
        studyPlanUntil: null,
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

function updateUI(user, data) {
    // تحديث المخبأ للاستخدام في التقرير
    window._cachedUserData = data || null;
    
    // ✅ إضافة متغير studyPlan للحفاظ على الحالة
    window.userStudyPlan = data && data.studyPlan === true;
    window.userStudyPlanUntil = data && data.studyPlanUntil || null;

    const profileEmail = document.getElementById('profileEmail');
    const profileEmailText = document.getElementById('profileEmailText');
    const profileExpiry = document.getElementById('profileExpiry');
    const profileExpiryText = document.getElementById('profileExpiryText');
    const profileStatus = document.getElementById('profileStatus');
    const profileUidValue = document.getElementById('profileUidValue');
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const navLoginBtn = document.getElementById('navLoginBtn');
    const navSubscribeBtn = document.getElementById('navSubscribeBtn');
    const featuresSubscribeBtn = document.getElementById('featuresSubscribeBtn');
    const profileIcon = document.getElementById('profileIcon');
    const studyPlannerBtn = document.getElementById('studyPlannerBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    // تحديد ما إذا كنا في الصفحة الرئيسية
    const homePage = document.getElementById('home');
    const isHomePage = homePage && homePage.classList.contains('active');

    // حالة زائر غير مسجل
    if (!user) {
        // ✅ إعادة تعيين studyPlan عند تسجيل الخروج
        window.userStudyPlan = false;
        window.userStudyPlanUntil = null;
        
        if (profileEmailText) profileEmailText.textContent = 'غير مسجل';
        if (profileExpiryText) profileExpiryText.textContent = 'الوصول محدود لبعض الامتحانات';
        if (profileStatus) profileStatus.innerHTML = '';
        if (profileUidValue) profileUidValue.textContent = '---';
        if (profileLogoutBtn) profileLogoutBtn.style.display = 'none';
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = 'inline-flex';
        if (profileIcon) profileIcon.style.display = 'none';
        // إخفاء زر الخطة اليومية في الصفحة الرئيسية، وإظهاره في باقي الصفحات
        if (studyPlannerBtn) studyPlannerBtn.style.display = isHomePage ? 'none' : 'inline-flex';
        if (settingsBtn) settingsBtn.style.display = 'none';

        const oldBtn = document.getElementById('dropdownUpgradeBtn');
        if (oldBtn) oldBtn.remove();

        _currentUserStatus = 'free';
        
        if (typeof window.toggleSessionButton === 'function') {
            setTimeout(window.toggleSessionButton, 50);
        }
        
        // زر تقريري يظهر دائماً حتى بدون تسجيل
        const reportBtn = document.getElementById('downloadReportBtn');
        if (reportBtn) {
            reportBtn.style.display = 'flex';
        }
        return;
    }

    // حالة مستخدم مسجل
    if (profileEmailText) profileEmailText.textContent = user.email;
    if (profileUidValue) profileUidValue.textContent = user.uid;
    if (profileLogoutBtn) profileLogoutBtn.style.display = 'block';
    if (navLoginBtn) navLoginBtn.style.display = 'none';
    if (profileIcon) profileIcon.style.display = 'flex';
    // إخفاء زر الخطة اليومية في الصفحة الرئيسية، وإظهاره في باقي الصفحات
    if (studyPlannerBtn) studyPlannerBtn.style.display = isHomePage ? 'none' : 'inline-flex';

    const isPremium = data && data.plan === 'premium' && 
                      (!data.premiumUntil || new Date(data.premiumUntil).getTime() > Date.now());

    _currentUserStatus = isPremium ? 'premium' : 'free';

    if (isPremium) {
        if (profileStatus) profileStatus.innerHTML = `<span class="status-premium">✅ مشترك (Pro)</span>`;
        if (profileExpiryText && data.premiumUntil) {
            profileExpiryText.textContent = `الصلاحية: حتى ${new Date(data.premiumUntil).toLocaleDateString('ar-EG')}`;
        } else if (profileExpiryText) {
            profileExpiryText.textContent = `الصلاحية: حساب دائم`;
        }
        
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'none';
        if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = 'none';
        if (settingsBtn) settingsBtn.style.display = 'inline-flex';
        
        const oldBtn = document.getElementById('dropdownUpgradeBtn');
        if (oldBtn) oldBtn.remove();
   
    } else {
        if (profileStatus) profileStatus.innerHTML = `<span class="status-free"><span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; margin-left: 4px;">credit_card_off</span> مجاني</span>`;
        if (profileExpiryText) profileExpiryText.textContent = 'حساب مجاني / انتهت الصلاحية';
        
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = 'inline-flex';
        if (settingsBtn) settingsBtn.style.display = 'none';

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

    if (typeof window.renderInitialExamList === 'function') {
        const listPage = document.getElementById('list');
        if (listPage && listPage.classList.contains('active')) {
            setTimeout(() => {
                window.renderInitialExamList();
            }, 50);
        }
    }
    
    if (typeof window.toggleSessionButton === 'function') {
        setTimeout(window.toggleSessionButton, 50);
    }
    
    // ✅ تطبيق قفل الخطة اليومية إذا كان متاحاً
    if (typeof window.applyStudyPlanLock === 'function') {
        setTimeout(window.applyStudyPlanLock, 100);
    }
}
// ============================================
// دوال المصادقة (Login, Signup, Logout, Reset)
// ============================================
async function handleLogin() {
    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (!email || !password) {
        authError.textContent = ' يرجى ملء جميع الحقول';
        return;
    }

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
            studyPlan: false,
            studyPlanUntil: null,
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
        authSignupBtn.disabled = false;
        authSignupBtn.innerHTML = originalText;
        authSignupBtn.style.opacity = '1';
    }
}

async function handleLogout(clearLocalDevice = true) {
    try {
        const user = auth.currentUser;
        
        if (clearLocalDevice) {
            if (user) {
                await db.collection('users').doc(user.uid).set({
                    session: { deviceId: null, loginAt: null },
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            }
            localStorage.removeItem('zertiva_deviceId');
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
    
    // ✅ بعد تحديث حالة المستخدم، استدعِ عرض القائمة الأولية (مرة واحدة فقط)
    if (typeof window.renderInitialExamList === 'function') {
        setTimeout(() => {
            window.renderInitialExamList();
        }, 50);
    }
});

// ============================================
// ربط الأحداث عند تحميل المستند
// ============================================
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

// ============================================
// 📄 ميزة "تقريري" (فتح صفحة تقرير HTML)
// ============================================

// الحصول على زر التحميل من DOM
const downloadReportBtn = document.getElementById('downloadReportBtn');

// ====== دوال مساعدة لقراءة البيانات من localStorage (بالمفاتيح الصحيحة) ======
function getLocalData(key, defaultValue = 'غير متوفر') {
    try {
        const val = localStorage.getItem(key);
        if (val === null || val === undefined) return defaultValue;
        return val;
    } catch {
        return defaultValue;
    }
}

function getLocalJSON(key, defaultValue = null) {
    try {
        const val = localStorage.getItem(key);
        if (!val) return defaultValue;
        return JSON.parse(val);
    } catch {
        return defaultValue;
    }
}

function getTotalStudyMinutes() {
    return parseInt(localStorage.getItem('total_study_minutes')) || 0;
}

function getTotalStudyHours() {
    const minutes = getTotalStudyMinutes();
    return (minutes / 60).toFixed(1);
}

function getExamDate() {
    return getLocalData('zertiva_exam_date', 'غير متوفر');
}

function getDailyGoal() {
    const data = getLocalJSON('stats_daily_data', { goal: 120 });
    const goal = data.goal || 120;
    const hours = Math.floor(goal / 60);
    const mins = goal % 60;
    if (hours > 0) {
        return hours + (hours === 1 ? ' ساعة' : ' ساعات') + (mins > 0 ? ' ' + mins + ' دقيقة' : '');
    }
    return mins + ' دقيقة';
}

function getStreak() {
    // إجمالي الأيام الناجحة (يعتمد على completed المخزن في history)
    const data = getLocalJSON('stats_daily_data', { history: [] });
    const history = data.history || [];
    let totalSuccessful = 0;
    history.forEach(entry => {
        // إذا كان completed موجوداً، استخدمه مباشرة
        if (entry.completed !== undefined) {
            if (entry.completed === true) totalSuccessful++;
        } else {
            // للأيام القديمة (قبل إضافة completed): نحسبها من goal و minutes المخزنين
            const goalAtDay = entry.goal || data.goal || 120;
            const minutes = entry.minutes || 0;
            if (minutes >= goalAtDay) totalSuccessful++;
        }
    });
    return totalSuccessful;
}

function getHistory() {
    const data = getLocalJSON('stats_daily_data', { history: [] });
    return data.history || [];
}

// ====== دوال قراءة نتائج الامتحانات بالمفاتيح الصحيحة (الفردية) ======
function getExamResultsForSkill(skill) {
    const prefix = `exam_result_${skill}_`;
    const exams = {};
    try {
        const allKeys = Object.keys(localStorage);
        const examKeys = allKeys.filter(k => k.startsWith(prefix));
        examKeys.forEach(k => {
            const examIdStr = k.substring(prefix.length);
            const examId = parseInt(examIdStr, 10);
            if (!isNaN(examId)) {
                const score = parseFloat(localStorage.getItem(k));
                if (!isNaN(score)) {
                    const retriesKey = `exam_retry_${skill}_${examId}`;
                    const retries = parseInt(localStorage.getItem(retriesKey)) || 0;
                    const lastReviewKey = `exam_last_review_${skill}_${examId}`;
                    const lastPlayed = localStorage.getItem(lastReviewKey) || null;
                    // نحاول الحصول على اسم الامتحان من examsDatabase
                    let examTitle = `امتحان ${examId}`;
                    try {
                        if (window.examsDatabase && window.examsDatabase[skill]) {
                            const examObj = window.examsDatabase[skill].find(e => e.id === examId);
                            if (examObj) examTitle = examObj.title;
                        }
                    } catch (e) {}
                    exams[examId] = {
                        score: score,
                        retries: retries,
                        lastPlayed: lastPlayed,
                        title: examTitle
                    };
                }
            }
        });
    } catch (e) {
        console.warn('⚠️ فشل قراءة نتائج المهارة:', skill, e);
    }
    return exams;
}

function getAllExamData() {
    const skills = ['hoeren1', 'hoeren2', 'hoeren3', 'lesen1', 'lesen2', 'lesen3', 'sprach1', 'sprach2'];
    const result = {};
    skills.forEach(skill => {
        result[skill] = getExamResultsForSkill(skill);
    });
    return result;
}

function collectUserReportData() {
    const user = auth.currentUser;
    const isLoggedIn = !!user;

    // 1. البيانات الأساسية من Auth (إن وجدت)
    const email = isLoggedIn ? (user.email || 'غير متوفر') : 'غير متوفر';
    const uid = isLoggedIn ? (user.uid || 'غير متوفر') : 'غير متوفر';
    
    let creationTime = 'غير متوفر';
    if (isLoggedIn && user.metadata?.creationTime) {
        try {
            creationTime = new Date(user.metadata.creationTime).toLocaleDateString('en-GB');
        } catch (e) { creationTime = 'غير متوفر'; }
    }

    // 2. الاسم من البيانات المخزنة أو من Auth
    let fullName = 'غير متوفر';
    let firstName = 'غير متوفر';
    let lastName = 'غير متوفر';
    let plan = 'مجاني';
    let expiryDate = 'غير متوفر';

    if (isLoggedIn) {
        // محاولة الحصول على البيانات من الكاش
        if (window._cachedUserData) {
            firstName = window._cachedUserData.firstname || 'غير متوفر';
            lastName = window._cachedUserData.lastname || 'غير متوفر';
            plan = window._cachedUserData.plan === 'premium' ? 'Pro' : 'مجاني';
            expiryDate = window._cachedUserData.premiumUntil || 'غير متوفر';
        } else {
            // محاولة القراءة من localStorage كاحتياطي
            try {
                const userData = getLocalJSON('zertiva_user_data', null);
                if (userData) {
                    firstName = userData.firstname || 'غير متوفر';
                    lastName = userData.lastname || 'غير متوفر';
                    plan = userData.plan === 'premium' ? 'Pro' : 'مجاني';
                    expiryDate = userData.premiumUntil || 'غير متوفر';
                }
            } catch (e) { /* تجاهل */ }
        }

        const displayName = user.displayName || '';
        fullName = displayName.trim() || (firstName + ' ' + lastName).trim() || 'غير متوفر';
    }

    // 3. بيانات الامتحان والإحصائيات (تعتمد فقط على localStorage)
    const examDate = getExamDate();
    let remainingDays = 'غير متوفر';
    if (examDate !== 'غير متوفر') {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const exam = new Date(examDate);
            exam.setHours(0, 0, 0, 0);
            const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
            remainingDays = diff > 0 ? diff + ' يوم' : 'انتهى';
        } catch (e) { /* تجاهل */ }
    }

    const totalHours = getTotalStudyHours();
    const streak = getStreak();
    const dailyGoal = getDailyGoal();
    const history = getHistory().slice(-30);

    // 4. نتائج الامتحانات (من localStorage)
    const examData = getAllExamData();

    return {
        fullName: fullName,
        email: email,
        uid: uid,
        creationTime: creationTime,
        plan: plan,
        expiryDate: expiryDate,
        examDate: examDate,
        remainingDays: remainingDays,
        totalHours: totalHours,
        streak: streak,
        dailyGoal: dailyGoal,
        history: history,
        examData: examData
    };
}
function openReportPage() {
    // تفعيل حالة التحميل على الزر
    const btn = document.getElementById('downloadReportBtn');
    if (btn) {
        btn.classList.add('loading');
        btn.textContent = '⏳ جاري التحضير...';
    }

    setTimeout(() => {
        try {
            // جمع البيانات (حتى لو لم يكن هناك مستخدم)
            const data = collectUserReportData();
            // حفظ البيانات في localStorage
            localStorage.setItem('zertiva_report_data', JSON.stringify(data));
            // فتح صفحة التقرير
            window.open('report.html', '_blank');
        } catch (error) {
            console.error('❌ خطأ في تحضير التقرير:', error);
            alert('حدث خطأ أثناء تحضير التقرير. يرجى المحاولة مرة أخرى.');
        } finally {
            if (btn) {
                btn.classList.remove('loading');
                btn.textContent = 'إحصائياتي';
            }
        }
    }, 50);
}
// ====== ربط زر التحميل ======
if (downloadReportBtn) {
    // نمنع التكرار
    const newBtn = downloadReportBtn.cloneNode(true);
    downloadReportBtn.parentNode.replaceChild(newBtn, downloadReportBtn);
    const freshBtn = document.getElementById('downloadReportBtn');
    freshBtn.textContent = 'إحصائياتي';
    freshBtn.addEventListener('click', openReportPage);

    // الزر يظهر دائماً (تم إزالة شرط إخفائه)
    freshBtn.style.display = 'flex';
}

// تم إزالة مراقبة auth.onAuthStateChanged التي كانت تخفي الزر

// ====== تخزين بيانات المستخدم في ذاكرة مؤقتة ======
const originalUpdateUI = updateUI;
updateUI = function(user, data) {
    if (data) {
        window._cachedUserData = data;
    }
    originalUpdateUI(user, data);
};

console.log('🎉 تم اعتماد البنية النهائية لـ Zertiva بنسبة 100/100.');
