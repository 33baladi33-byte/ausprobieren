// ============================================
// auth.js - نظام المصادقة مع Firebase + Firestore (نسخة متطورة)
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
// دوال عرض/إخفاء النوافذ
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
        authModalTitle.textContent = '🔐 تسجيل الدخول';
    } else if (form === 'signup') {
        signupForm.style.display = 'block';
        authModalTitle.textContent = '📝 إنشاء حساب';
    } else if (form === 'reset') {
        resetForm.style.display = 'block';
        authModalTitle.textContent = '🔑 تغيير كلمة المرور';
    }
    clearErrors();
}

function clearErrors() {
    if (authError) authError.textContent = '';
    if (signupError) signupError.textContent = '';
    if (resetError) resetError.textContent = '';
}

// ============================================
// إظهار/إخفاء كلمة المرور
// ============================================
function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    if (input && toggle) {
        toggle.addEventListener('click', function() {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            this.textContent = isPassword ? '🙈' : '👁️';
        });
    }
}

// ============================================
// دالة إنشاء مستند المستخدم في Firestore
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
        
        const userData = {
            email: user.email,
            username: additionalData.username || user.email.split('@')[0] || 'مستخدم',
            firstname: additionalData.firstname || '',
            lastname: additionalData.lastname || '',
            plan: 'free',
            premiumUntil: null,
            currentSession: null,
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
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
// دالة جلب حالة المستخدم (قراءة فقط)
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
                const today = new Date().toISOString().split('T')[0];
                if (today <= data.premiumUntil) {
                    return 'premium';
                }
                return 'free';
            }
            return 'free';
        } else {
            console.log('📝 إنشاء مستند جديد للمستخدم القديم:', user.email);
            await createUserDocument(user);
            return 'free';
        }
    } catch (error) {
        console.error('❌ خطأ في جلب حالة المستخدم:', error);
        return 'free';
    }
};

// ============================================
// دوال المصادقة (Firebase)
// ============================================
async function handleLogin() {
    const email = authEmail.value.trim();
    const password = authPassword.value;
    
    if (!email || !password) {
        authError.textContent = '⚠️ يرجى ملء جميع الحقول';
        return;
    }
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeAuthModalFunc();
        showToast('✅ تم تسجيل الدخول بنجاح', 'success');
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
        
        await createUserDocument(user, { username, firstname, lastname });
        
        closeAuthModalFunc();
        showToast('✅ تم إنشاء الحساب بنجاح', 'success');
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
    showToast('📱 تم فتح واتساب', 'info');
}

async function handleLogout() {
    try {
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
// ✅ تحديث الملف الشخصي (باستخدام عناصر التصميم القديم)
// ============================================
async function updateProfile() {
    const user = auth.currentUser;
    
    // عناصر التصميم القديم الموجودة في index.html
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
        // ❌ المستخدم غير مسجل
        if (profileEmail) profileEmail.innerHTML = '👤 غير مسجل';
        if (profileExpiry) profileExpiry.textContent = 'الوصول محدود لبعض الامتحانات';
        if (profileStatus) profileStatus.innerHTML = '';
        if (profileUidValue) profileUidValue.textContent = '---';
        if (profileLogoutBtn) profileLogoutBtn.style.display = 'none';
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        if (profileIcon) profileIcon.style.display = 'none';
        
        // إضافة زر الترقية للمستخدم غير المسجل
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

    // ✅ المستخدم مسجل
    try {
        const doc = await db.collection('users').doc(user.uid).get();
        const data = doc.exists ? doc.data() : {};
        
        // عرض البريد الإلكتروني
        if (profileEmail) profileEmail.innerHTML = `📧 ${user.email}`;

        // تحديد حالة الاشتراك
        const isPremium = data.plan === 'premium' && data.premiumUntil && new Date(data.premiumUntil) > new Date();
        
        if (isPremium) {
            const expiry = new Date(data.premiumUntil);
            if (profileExpiry) profileExpiry.textContent = `📅 الصلاحية: حتى ${expiry.toLocaleDateString('ar-EG')}`;
            if (profileStatus) profileStatus.innerHTML = `<span class="status-premium">✅ مشترك (Pro)</span>`;
            if (navSubscribeBtn) navSubscribeBtn.style.display = 'none';
        } else {
            if (profileExpiry) profileExpiry.textContent = '⏰ انتهت الصلاحية';
            if (profileStatus) profileStatus.innerHTML = `<span class="status-free">📖 مجاني</span>`;
            if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        }

        // ✅ عرض UID كاملاً
        if (profileUidValue) profileUidValue.textContent = user.uid;

        // إظهار/إخفاء الأزرار
        if (profileLogoutBtn) profileLogoutBtn.style.display = 'block';
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'flex';

        // إزالة زر الترقية إن وجد (لأن المستخدم مسجل)
        const oldBtn = document.getElementById('dropdownUpgradeBtn');
        if (oldBtn) oldBtn.remove();

    } catch (error) {
        console.error('خطأ في تحديث الملف الشخصي:', error);
    }
}

// ============================================
// مراقب حالة المستخدم
// ============================================
auth.onAuthStateChanged(user => {
    if (user) {
        updateProfile();
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'flex';
    } else {
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (profileIcon) profileIcon.style.display = 'none';
        if (profileDropdown) profileDropdown.classList.remove('show');
        updateProfile();
    }
});

// ============================================
// ربط الأحداث
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // إظهار/إخفاء كلمة المرور
    togglePasswordVisibility('authPassword', 'togglePassword');
    togglePasswordVisibility('signupPassword', 'toggleSignupPassword');
    togglePasswordVisibility('resetNewPassword', 'toggleResetPassword');
    
    // زر تسجيل الدخول في الشريط العلوي
    if (navLoginBtn) navLoginBtn.addEventListener('click', () => openAuthModal('login'));
    if (closeAuthModal) closeAuthModal.addEventListener('click', closeAuthModalFunc);
    if (authModal) authModal.addEventListener('click', (e) => { if (e.target === authModal) closeAuthModalFunc(); });
    
    // أزرار تسجيل الدخول في النموذج
    if (authLoginBtn) authLoginBtn.addEventListener('click', handleLogin);
    if (authSignupBtn) authSignupBtn.addEventListener('click', handleSignup);
    if (resetWhatsAppBtn) resetWhatsAppBtn.addEventListener('click', handleReset);
    
    // التنقل بين النماذج
    if (switchToSignup) switchToSignup.addEventListener('click', () => showForm('signup'));
    if (switchToLogin) switchToLogin.addEventListener('click', () => showForm('login'));
    if (switchToReset) switchToReset.addEventListener('click', () => showForm('reset'));
    if (switchToLoginFromReset) switchToLoginFromReset.addEventListener('click', () => showForm('login'));
    
    // ✅ حدث النقر على أيقونة الملف الشخصي
    if (profileIcon) profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileDropdown) profileDropdown.classList.toggle('show');
    });
    
    // ✅ زر تسجيل الخروج
    if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', handleLogout);
    
    // الإعدادات
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
    
    // ✅ إغلاق القائمة المنسدلة عند الضغط خارجها
    document.addEventListener('click', (e) => {
        if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileIcon) {
            profileDropdown.classList.remove('show');
        }
    });
});

console.log('✅ auth.js (نسخة متطورة مع مودال موحد) تم تحميله بنجاح');
