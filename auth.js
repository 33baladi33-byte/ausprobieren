// ============================================
// auth.js - نظام المصادقة مع Firebase
// ============================================

const popupEmail = document.getElementById('popupEmail');
const popupPassword = document.getElementById('popupPassword');
const popupError = document.getElementById('popupError');
const popupLoginBtn = document.getElementById('popupLoginBtn');
const popupSignupBtn = document.getElementById('popupSignupBtn');
const popupResetBtn = document.getElementById('popupResetBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const loginPopup = document.getElementById('loginPopup');
const profileIcon = document.getElementById('profileIcon');
const profileDropdown = document.getElementById('profileDropdown');
const profileEmail = document.getElementById('profileEmail');
const profileLogoutBtn = document.getElementById('profileLogoutBtn');
const navLoginBtn = document.getElementById('navLoginBtn');
const navSubscribeBtn = document.getElementById('navSubscribeBtn');

function showPopupError(msg) {
    if (popupError) popupError.innerText = msg;
    setTimeout(() => { if (popupError) popupError.innerText = ''; }, 5000);
}

function openLoginPopup() {
    if (loginPopup) loginPopup.style.display = 'flex';
}
function closeLoginPopup() {
    if (loginPopup) loginPopup.style.display = 'none';
}

async function signIn(email, password) {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeLoginPopup();
    } catch (error) {
        showPopupError(error.message);
    }
}

async function signUp(email, password) {
    if (password.length < 6) {
        showPopupError('كلمة المرور يجب أن تكون 6 أحرف أو أكثر');
        return;
    }
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        localStorage.setItem('userPass_' + user.uid, password);
        await user.sendEmailVerification();
        alert('✅ تم إنشاء الحساب بنجاح! تم حفظ كلمة المرور محلياً.');
        closeLoginPopup();
    } catch (error) {
        showPopupError(error.message);
    }
}

async function resetPassword(email) {
    if (!email) { showPopupError('يرجى كتابة بريدك الإلكتروني أولاً'); return; }
    try {
        await auth.sendPasswordResetEmail(email);
        alert('📧 تم إرسال رابط إعادة التعيين إلى بريدك');
    } catch (error) {
        showPopupError(error.message);
    }
}

async function logOut() {
    try {
        await auth.signOut();
        if (profileDropdown) profileDropdown.classList.remove('active');
    } catch (error) { console.error(error); }
}

// تحديث واجهة المستخدم
function updateUI(user) {
    if (user) {
        if (profileIcon) profileIcon.style.display = 'flex';
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'none';
        if (profileEmail) profileEmail.innerText = user.email;
    } else {
        if (profileIcon) profileIcon.style.display = 'none';
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-block';
        if (profileEmail) profileEmail.innerText = 'غير مسجل';
    }
    // تحديث الإعدادات
    updateSettingsUI(user);
}

// تحديث بيانات الإعدادات (UID + البريد + كلمة المرور)
function updateSettingsUI(user) {
    const emailSpan = document.getElementById('settingsUserEmail');
    const uidSpan = document.getElementById('settingsUserUid');
    const passSpan = document.getElementById('settingsUserPass');
    if (!emailSpan || !uidSpan || !passSpan) return;
    if (user) {
        emailSpan.innerText = user.email;
        uidSpan.innerText = user.uid;
        const savedPass = localStorage.getItem('userPass_' + user.uid);
        passSpan.innerText = savedPass ? savedPass : 'لم تُحفظ';
    } else {
        emailSpan.innerText = 'غير مسجل';
        uidSpan.innerText = 'لا يوجد';
        passSpan.innerText = 'غير متوفرة';
    }
}

// مراقب حالة المستخدم
auth.onAuthStateChanged(user => {
    updateUI(user);
    if (profileDropdown) profileDropdown.classList.remove('active');
});

// ربط الأحداث
if (navLoginBtn) navLoginBtn.addEventListener('click', openLoginPopup);
if (navSubscribeBtn) navSubscribeBtn.addEventListener('click', openLoginPopup);
if (closePopupBtn) closePopupBtn.addEventListener('click', closeLoginPopup);
if (loginPopup) {
    loginPopup.addEventListener('click', (e) => {
        if (e.target === loginPopup) closeLoginPopup();
    });
}
if (popupLoginBtn) {
    popupLoginBtn.addEventListener('click', () => {
        const email = popupEmail.value.trim();
        const pass = popupPassword.value;
        signIn(email, pass);
    });
}
if (popupSignupBtn) {
    popupSignupBtn.addEventListener('click', () => {
        const email = popupEmail.value.trim();
        const pass = popupPassword.value;
        signUp(email, pass);
    });
}
if (popupResetBtn) {
    popupResetBtn.addEventListener('click', () => {
        const email = popupEmail.value.trim();
        resetPassword(email);
    });
}
if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener('click', logOut);
}
if (profileIcon) {
    profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileDropdown) profileDropdown.classList.toggle('active');
    });
}
document.addEventListener('click', (e) => {
    if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileIcon) {
        profileDropdown.classList.remove('active');
    }
});

console.log('✅ auth.js تم تحميله بنجاح');
