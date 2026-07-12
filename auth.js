// ============================================
// auth.js - نظام المصادقة مع Firebase + Firestore
// ============================================

// ✅ جلب مرجع قاعدة البيانات من window (تم تعريفه في index.html)
const db = window.db;

// ============================================
// عناصر DOM
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
const profileStatus = document.getElementById('profileStatus'); // ✅ لعرض الحالة
const profileLogoutBtn = document.getElementById('profileLogoutBtn');
const navLoginBtn = document.getElementById('navLoginBtn');
const navSubscribeBtn = document.getElementById('navSubscribeBtn');

// ============================================
// دوال مساعدة
// ============================================
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

// ============================================
// دالة جلب حالة المستخدم من Firestore (عامة)
// ============================================
window.getUserStatusGlobal = async function() {
    const user = auth.currentUser;
    if (!user) {
        return 'guest';
    }

    try {
        const docRef = db.collection('users').doc(user.uid);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();
            
            // ✅ التحقق من الاشتراك المدفوع
            if (data.premium && data.premiumUntil) {
                const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
                if (today <= data.premiumUntil) {
                    return 'premium';
                } else {
                    // (اختياري) لو انتهت الصلاحية، نحدثها في الخلفية
                    // await docRef.update({ premium: false });
                    return 'free';
                }
            }
            return 'free';
        } else {
            // ✅ إذا لم يكن هناك مستند، ننشئ واحداً (للمستخدمين القدامى)
            await db.collection('users').doc(user.uid).set({
                email: user.email,
                premium: false,
                premiumUntil: null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return 'free';
        }
    } catch (error) {
        console.error('❌ خطأ في جلب حالة المستخدم:', error);
        return 'free';
    }
};

// ============================================
// دوال المصادقة الأساسية
// ============================================
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
        
        // ✅ حفظ كلمة المرور محلياً (للعرض في الإعدادات)
        localStorage.setItem('userPass_' + user.uid, password);
        
        // ✅✅✅ إنشاء مستند المستخدم في Firestore (وضع Free افتراضي) ✅✅✅
        try {
            await db.collection('users').doc(user.uid).set({
                email: user.email,
                premium: false,
                premiumUntil: null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ تم إنشاء مستند المستخدم في Firestore');
        } catch (e) {
            console.warn('⚠️ فشل إنشاء المستند في Firestore:', e);
        }
        
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

// ============================================
// تحديث واجهة المستخدم (UI)
// ============================================
async function updateUI(user) {
    if (user) {
        // ✅ إظهار أيقونة الملف الشخصي
        if (profileIcon) profileIcon.style.display = 'flex';
        
        // ✅ إخفاء زر تسجيل الدخول
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        
        // ✅ إبقاء زر "اشترك" ظاهراً (يذهب لصفحة الاشتراك)
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-block';
        
        // ✅ عرض البريد الإلكتروني
        if (profileEmail) profileEmail.innerText = user.email;
        
        // ✅ حفظ البريد في localStorage للتوافق مع صفحات أخرى
        localStorage.setItem('zertiva_email', user.email);

        // ✅✅✅ جلب حالة المستخدم من Firestore وعرضها في القائمة المنسدلة ✅✅✅
        if (profileStatus) {
            const status = await window.getUserStatusGlobal();
            if (status === 'premium') {
                profileStatus.innerText = '⭐ مشترك (Premium)';
                profileStatus.style.color = '#10b981';
            } else {
                profileStatus.innerText = '🆓 مجاني (Free)';
                profileStatus.style.color = '#f59e0b';
            }
        }
    } else {
        // ❌ غير مسجل
        if (profileIcon) profileIcon.style.display = 'none';
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-block';
        if (profileEmail) profileEmail.innerText = 'غير مسجل';
        if (profileStatus) {
            profileStatus.innerText = '';
            profileStatus.style.color = '';
        }
    }
    // تحديث بيانات الإعدادات (UID + البريد + كلمة المرور)
    updateSettingsUI(user);
}

// ============================================
// تحديث بيانات الإعدادات (UID + البريد + كلمة المرور)
// ============================================
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

// ============================================
// مراقب حالة المستخدم (الأهم)
// ============================================
auth.onAuthStateChanged(user => {
    updateUI(user);
    if (profileDropdown) profileDropdown.classList.remove('active');
});

// ============================================
// ربط الأحداث (Event Listeners)
// ============================================

// 1. زر تسجيل الدخول (يفتح النافذة المنبثقة)
if (navLoginBtn) {
    navLoginBtn.addEventListener('click', openLoginPopup);
    console.log('✅ زر تسجيل الدخول مربوط');
}

// 2. زر اشترك (يذهب مباشرة إلى صفحة الاشتراك)
if (navSubscribeBtn) {
    navSubscribeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'subscribe.html';
    });
    console.log('✅ زر اشترك مربوط (يذهب لصفحة الاشتراك)');
}

// 3. إغلاق النافذة المنبثقة
if (closePopupBtn) {
    closePopupBtn.addEventListener('click', closeLoginPopup);
}

// 4. إغلاق النافذة عند الضغط خارجها
if (loginPopup) {
    loginPopup.addEventListener('click', (e) => {
        if (e.target === loginPopup) closeLoginPopup();
    });
}

// 5. أزرار داخل النافذة المنبثقة
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

// 6. تسجيل الخروج
if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener('click', logOut);
}

v

// 8. إغلاق القائمة المنسدلة عند الضغط في أي مكان آخر
document.addEventListener('click', (e) => {
    if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileIcon) {
        profileDropdown.classList.remove('active');
    }
});

console.log('✅ auth.js (مع Firestore) تم تحميله بنجاح');
