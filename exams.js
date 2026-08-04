// ============================================
// auth.js - النظام النهائي المعتمد للمصادقة (Zertiva Gold Standard)
// (قراءة واحدة عند الـ Refresh - آمن 100% - حماية كاملة من الحسابات الناقصة)
// مع ميزة تحميل معلوماتي (PDF Report) باللغة الإنجليزية والمفاتيح الصحيحة لـ exams.js
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

function updateUI(user, data) {
    // تحديث المخبأ
    window._cachedUserData = data || null;

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

        // ✅ إضافة firstname و lastname بشكل صحيح
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
// 📄 ميزة "تحميل معلوماتي" (PDF Report) - النسخة المصححة بالكامل
// ============================================

// الحصول على زر التحميل من DOM
const downloadReportBtn = document.getElementById('downloadReportBtn');

// ====== دوال مساعدة لقراءة البيانات من localStorage (بالمفاتيح الصحيحة حسب exams.js) ======
function getLocalData(key, defaultValue = 'N/A') {
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
    return getLocalData('zertiva_exam_date', 'N/A');
}

function getDailyGoal() {
    const data = getLocalJSON('stats_daily_data', { goal: 120 });
    const goal = data.goal || 120;
    const hours = Math.floor(goal / 60);
    const mins = goal % 60;
    if (hours > 0) {
        return hours + 'h' + (mins > 0 ? ' ' + mins + 'm' : '');
    }
    return mins + 'm';
}

function getStreak() {
    const data = getLocalJSON('stats_daily_data', {});
    const goal = data.goal || 120;
    if (goal <= 0) return 0;
    let streak = 0;
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    for (let i = 0; i < 365; i++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const key = `session_total_${dateStr}`;
        const minutes = parseInt(localStorage.getItem(key)) || 0;
        if (minutes >= goal) {
            streak++;
        } else {
            break;
        }
        currentDate.setDate(currentDate.getDate() - 1);
    }
    return streak;
}

function getHistory() {
    const data = getLocalJSON('stats_daily_data', { history: [] });
    return data.history || [];
}

// ====== دوال قراءة نتائج الامتحانات بالمفاتيح الصحيحة (وفقاً لـ exams.js) ======
function getExamResultBySkillAndId(skill, examId) {
    const key = `exam_result_${skill}_${examId}`;
    try {
        const val = localStorage.getItem(key);
        return val !== null ? parseFloat(val) : null;
    } catch {
        return null;
    }
}

function getExamRetriesBySkillAndId(skill, examId) {
    const key = `exam_retry_${skill}_${examId}`;
    try {
        const val = localStorage.getItem(key);
        return val !== null ? parseInt(val, 10) : 0;
    } catch {
        return 0;
    }
}

function getExamLastReviewBySkillAndId(skill, examId) {
    const key = `exam_last_review_${skill}_${examId}`;
    return getLocalData(key, null);
}

function getExamResultsForSkill(skill) {
    // نقوم بجمع جميع المفاتيح التي تبدأ بـ exam_result_${skill}_
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
                    exams[examId] = {
                        score: score,
                        retries: getExamRetriesBySkillAndId(skill, examId),
                        lastPlayed: getExamLastReviewBySkillAndId(skill, examId)
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

// ====== جمع بيانات التقرير مع مصادر صحيحة ======
function collectUserReportData() {
    const user = auth.currentUser;
    if (!user) throw new Error('User not logged in');

    // 1. البيانات الأساسية من Auth
    const email = user.email || 'N/A';
    const uid = user.uid || 'N/A';
    const creationTime = user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US') : 'N/A';

    // 2. الاسم من Firestore (من window._cachedUserData)
    let firstName = 'N/A';
    let lastName = 'N/A';
    let plan = 'Free';
    let expiryDate = 'N/A';

    if (window._cachedUserData) {
        firstName = window._cachedUserData.firstname || 'N/A';
        lastName = window._cachedUserData.lastname || 'N/A';
        plan = window._cachedUserData.plan === 'premium' ? 'Premium' : 'Free';
        expiryDate = window._cachedUserData.premiumUntil || 'N/A';
    } else {
        // محاولة قراءة من localStorage كاحتياطي (إن وجدت)
        try {
            const userData = getLocalJSON('zertiva_user_data', null);
            if (userData) {
                firstName = userData.firstname || 'N/A';
                lastName = userData.lastname || 'N/A';
                plan = userData.plan === 'premium' ? 'Premium' : 'Free';
                expiryDate = userData.premiumUntil || 'N/A';
            }
        } catch (e) { /* تجاهل */ }
    }

    // 3. بيانات الامتحان والإحصائيات
    const examDate = getExamDate();
    let remainingDays = 'N/A';
    if (examDate !== 'N/A') {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const exam = new Date(examDate);
            exam.setHours(0, 0, 0, 0);
            const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
            remainingDays = diff > 0 ? diff + ' days' : 'Expired';
        } catch (e) { /* تجاهل */ }
    }

    const totalHours = getTotalStudyHours();
    const streak = getStreak();
    const dailyGoal = getDailyGoal();
    const history = getHistory().slice(-30);

    // 4. نتائج الامتحانات
    const examData = getAllExamData();

    return {
        firstName,
        lastName,
        email,
        uid,
        creationTime,
        plan,
        expiryDate,
        examDate,
        remainingDays,
        totalHours,
        streak,
        dailyGoal,
        history,
        examData
    };
}

// ====== إنشاء الـ PDF باللغة الإنجليزية (لتجنب مشاكل الخط العربي) ======
function generateReportPDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 20;

    // دالة مساعدة للكتابة (جميع النصوص باللغة الإنجليزية)
    function writeLine(text, x = margin, yPos, fontSize = 11, style = 'normal', color = '#333333') {
        doc.setFontSize(fontSize);
        doc.setTextColor(color);
        doc.setFont('helvetica', style);
        doc.text(text, x, yPos);
    }

    function writeBoldLine(text, x = margin, yPos, fontSize = 11) {
        writeLine(text, x, yPos, fontSize, 'bold');
    }

    function writeSectionTitle(title, yPos) {
        writeBoldLine(title, margin, yPos, 14);
        const lineY = yPos + 2;
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, lineY, pageWidth - margin, lineY);
        return yPos + 6;
    }

    function formatDate(dateStr) {
        if (!dateStr || dateStr === 'N/A') return dateStr;
        try {
            const d = new Date(dateStr);
            return d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        } catch {
            return dateStr;
        }
    }

    // العنوان الرئيسي
    doc.setFontSize(18);
    doc.setTextColor('#1a2a4a');
    doc.setFont('helvetica', 'bold');
    doc.text('Zertiva B2 Report', pageWidth / 2, y, { align: 'center' });
    y += 10;

    // ملخص سريع
    y = writeSectionTitle('Progress Summary', y);
    writeLine(`Plan: ${data.plan}`, margin, y);
    y += 6;
    writeLine(`Exam Remaining: ${data.remainingDays}`, margin, y);
    y += 6;
    writeLine(`Study: ${data.totalHours} hours`, margin, y);
    y += 6;
    writeLine(`Current Streak: ${data.streak} days`, margin, y);
    y += 8;

    // معلومات الحساب
    y = writeSectionTitle('Account', y);
    writeLine(`Name: ${data.firstName} ${data.lastName}`, margin, y);
    y += 6;
    writeLine(`Email: ${data.email}`, margin, y);
    y += 6;
    writeLine(`Plan: ${data.plan}`, margin, y);
    y += 6;
    writeLine(`Created: ${data.creationTime}`, margin, y);
    y += 6;
    writeLine(`UID: ${data.uid}`, margin, y);
    y += 8;

    // معلومات الامتحان
    y = writeSectionTitle('Exam', y);
    writeLine(`Exam Date: ${data.examDate}`, margin, y);
    y += 6;
    writeLine(`Remaining: ${data.remainingDays}`, margin, y);
    y += 8;

    // إحصائيات الدراسة
    y = writeSectionTitle('Study', y);
    writeLine(`Total Hours: ${data.totalHours}`, margin, y);
    y += 6;
    writeLine(`Daily Goal: ${data.dailyGoal}`, margin, y);
    y += 6;
    writeLine(`Current Streak: ${data.streak} days`, margin, y);
    y += 8;

    // سجل الأيام (آخر 7 أيام)
    y = writeSectionTitle('Recent Activity', y);
    const recentHistory = data.history.slice(-7).reverse();
    if (recentHistory.length === 0) {
        writeLine('—', margin, y);
        y += 6;
    } else {
        recentHistory.forEach(entry => {
            const date = entry.date || 'N/A';
            const minutes = entry.minutes || 0;
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            let timeStr = '';
            if (hours > 0) {
                timeStr = hours + 'h';
                if (mins > 0) timeStr += ' ' + mins + 'm';
            } else {
                timeStr = mins + 'm';
            }
            writeLine(`${date} — ${timeStr}`, margin, y);
            y += 5;
        });
    }
    y += 4;

    // نتائج الامتحانات
    y = writeSectionTitle('Exam Progress', y);
    const skills = [
        { id: 'hoeren1', label: 'Hören 1' },
        { id: 'hoeren2', label: 'Hören 2' },
        { id: 'hoeren3', label: 'Hören 3' },
        { id: 'lesen1', label: 'Lesen 1' },
        { id: 'lesen2', label: 'Lesen 2' },
        { id: 'lesen3', label: 'Lesen 3' },
        { id: 'sprach1', label: 'Sprachbausteine 1' },
        { id: 'sprach2', label: 'Sprachbausteine 2' }
    ];

    skills.forEach(skill => {
        const exams = data.examData[skill.id] || {};
        const examIds = Object.keys(exams);
        if (examIds.length === 0) {
            writeBoldLine(skill.label, margin, y, 11);
            y += 5;
            writeLine('  Not started yet', margin, y, 10);
            y += 6;
            return;
        }

        // أفضل نتيجة
        let bestScore = null;
        let totalRetries = 0;
        let latestDate = null;
        examIds.forEach(id => {
            const exam = exams[id];
            if (exam.score !== null && exam.score !== undefined) {
                if (bestScore === null || exam.score > bestScore) {
                    bestScore = exam.score;
                }
            }
            totalRetries += exam.retries || 0;
            if (exam.lastPlayed) {
                const d = new Date(exam.lastPlayed);
                if (!latestDate || d > new Date(latestDate)) {
                    latestDate = exam.lastPlayed;
                }
            }
        });

        writeBoldLine(skill.label, margin, y, 11);
        y += 5;
        if (bestScore !== null) {
            writeLine(`  Best Score: ${bestScore} / 25`, margin, y, 10);
            y += 5;
        } else {
            writeLine('  Best Score: —', margin, y, 10);
            y += 5;
        }
        writeLine(`  Total Attempts: ${totalRetries}`, margin, y, 10);
        y += 5;
        writeLine(`  Last Played: ${latestDate ? formatDate(latestDate) : '—'}`, margin, y, 10);
        y += 6;
    });

    // تذييل
    const footerY = doc.internal.pageSize.getHeight() - 10;
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(`Generated: ${new Date().toLocaleString('en-US')}`, pageWidth / 2, footerY, { align: 'center' });

    return doc;
}

// ====== دالة التحميل الرئيسية ======
async function downloadReport() {
    if (!auth.currentUser) {
        alert('Please login first');
        return;
    }

    // تفعيل حالة التحميل
    if (downloadReportBtn) {
        downloadReportBtn.classList.add('loading');
        downloadReportBtn.textContent = '⏳ Generating report...';
    }

    // استخدام setTimeout لتجنب تجميد الواجهة
    setTimeout(async () => {
        try {
            // جمع البيانات
            const data = collectUserReportData();

            // إنشاء الـ PDF
            const doc = generateReportPDF(data);

            // إنشاء اسم الملف
            const firstName = data.firstName || 'User';
            const lastName = data.lastName || '';
            const dateStr = new Date().toISOString().slice(0, 10);
            const fileName = `Zertiva_B2_Report_${firstName}_${lastName}_${dateStr}.pdf`.replace(/\s+/g, '_');

            // تحميل الملف
            doc.save(fileName);

        } catch (error) {
            console.error('❌ خطأ في إنشاء التقرير:', error);
            alert('An error occurred while generating the report. Please try again.');
        } finally {
            // إعادة الزر إلى حالته الطبيعية
            if (downloadReportBtn) {
                downloadReportBtn.classList.remove('loading');
                downloadReportBtn.textContent = '📄 تحميل معلوماتي';
            }
        }
    }, 50);
}

// ====== ربط زر التحميل ======
if (downloadReportBtn) {
    downloadReportBtn.addEventListener('click', downloadReport);
    // في حالة عدم وجود مستخدم مسجل، نخفي الزر
    if (!auth.currentUser) {
        downloadReportBtn.style.display = 'none';
    }
}

// تحديث ظهور الزر عند تغيير حالة المصادقة
auth.onAuthStateChanged(user => {
    if (downloadReportBtn) {
        downloadReportBtn.style.display = user ? 'flex' : 'none';
    }
});

console.log('🎉 تم اعتماد البنية النهائية لـ Zertiva بنسبة 100/100.');
