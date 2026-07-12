// ============================================
// auth.js - نظام المصادقة مع Firebase + Firestore
// ============================================

// ============================================
// انتظار توفر db من window
// ============================================
let db = window.db;
if (!db) {
    console.warn('⚠️ db غير معرف، محاولة الانتظار...');
    const waitForDb = setInterval(() => {
        if (window.db) {
            db = window.db;
            clearInterval(waitForDb);
            console.log('✅ db تم تعريفه');
        }
    }, 100);
}

// ============================================
// عناصر DOM (للملف الشخصي الجديد)
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
const profileStatus = document.getElementById('profileStatus');
const profileLogoutBtn = document.getElementById('profileLogoutBtn');
const navLoginBtn = document.getElementById('navLoginBtn');
const navSubscribeBtn = document.getElementById('navSubscribeBtn');

// عناصر البطاقة الجديدة
const profileDisplayName = document.getElementById('profileDisplayName');
const profileUid = document.getElementById('profileUid');
const profileExpiry = document.getElementById('profileExpiry');

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
// دالة إنشاء مستند المستخدم في Firestore (مرة واحدة فقط)
// ============================================
async function createUserDocument(user, additionalData = {}) {
    try {
        const userRef = db.collection('users').doc(user.uid);
        const docSnap = await userRef.get();
        
        // ✅ إذا كان المستند موجوداً، لا نعيد كتابة plan و premiumUntil
        if (docSnap.exists) {
            console.log('📝 المستند موجود، تحديث البيانات الأساسية فقط');
            // تحديث فقط الحقول التي لا تؤثر على الاشتراك
            await userRef.update({
                username: additionalData.username || user.email.split('@')[0] || 'مستخدم',
                firstname: additionalData.firstname || '',
                lastname: additionalData.lastname || '',
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        }
        
        // ✅ المستند غير موجود -> ننشئه لأول مرة
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
// دالة جلب حالة المستخدم (قراءة فقط، لا تعدل)
// ============================================
window.getUserStatusGlobal = async function() {
    const user = auth.currentUser;
    if (!user) return 'guest';

    try {
        const docRef = db.collection('users').doc(user.uid);
        const docSnap = await docRef.get();
        
        if (docSnap.exists) {
            const data = docSnap.data();
            
            // ✅ قراءة فقط، لا نعدل أي شيء
            if (data.plan === 'premium' && data.premiumUntil) {
                const today = new Date().toISOString().split('T')[0];
                if (today <= data.premiumUntil) {
                    return 'premium';
                }
                // ✅ إذا انتهت الصلاحية، نرجع free لكن لا نعدل في Firestore
                return 'free';
            }
            return 'free';
        } else {
            // ✅ المستند غير موجود -> ننشئه (مرة واحدة فقط)
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
// دوال المصادقة
// ============================================
async function signIn(email, password) {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeLoginPopup();
    } catch (error) {
        showPopupError(error.message);
    }
}

async function signUp(email, password, additionalData = {}) {
    if (password.length < 6) {
        showPopupError('كلمة المرور يجب أن تكون 6 أحرف أو أكثر');
        return;
    }
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        localStorage.setItem('userPass_' + user.uid, password);

        // ✅ إنشاء مستند المستخدم في Firestore
        await createUserDocument(user, additionalData);

        await user.sendEmailVerification();
        alert('✅ تم إنشاء الحساب بنجاح!');
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
// تحديث واجهة المستخدم (مع البطاقة الجديدة)
// ============================================
async function updateUI(user) {
    if (user) {
        if (profileIcon) profileIcon.style.display = 'flex';
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-block';
        if (profileEmail) profileEmail.innerText = user.email;
        localStorage.setItem('zertiva_email', user.email);

        try {
            const docRef = db.collection('users').doc(user.uid);
            const docSnap = await docRef.get();
            
            if (docSnap.exists) {
                const data = docSnap.data();
                
                // ✅ عرض الاسم
                const displayName = data.username || user.email.split('@')[0] || 'مستخدم';
                if (profileDisplayName) profileDisplayName.innerText = displayName;
                
                // ✅ عرض الحالة
                const status = await window.getUserStatusGlobal();
                if (profileStatus) {
                    if (status === 'premium') {
                        profileStatus.innerHTML = `<span class="status-badge premium">⭐ مشترك (Premium)</span>`;
                    } else {
                        profileStatus.innerHTML = `<span class="status-badge free">🆓 مجاني (Free)</span>`;
                    }
                }
                
                // ✅ عرض تاريخ انتهاء الاشتراك
                if (profileExpiry && data.premiumUntil) {
                    const date = new Date(data.premiumUntil);
                    const formatted = date.toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });
                    profileExpiry.innerText = `ينتهي الاشتراك: ${formatted}`;
                } else if (profileExpiry) {
                    profileExpiry.innerText = '';
                }
                
                // ✅ عرض UID
                if (profileUid) {
                    const uid = user.uid;
                    profileUid.innerText = uid.length > 20 ? uid.substring(0, 20) + '...' : uid;
                }
            }
        } catch (error) {
            console.warn('⚠️ فشل جلب بيانات المستخدم:', error);
        }
    } else {
        if (profileIcon) profileIcon.style.display = 'none';
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-block';
        if (profileEmail) profileEmail.innerText = 'غير مسجل';
        if (profileStatus) {
            profileStatus.innerHTML = '';
        }
        if (profileDisplayName) profileDisplayName.innerText = 'مستخدم';
        if (profileExpiry) profileExpiry.innerText = '';
        if (profileUid) profileUid.innerText = '---';
    }
    updateSettingsUI(user);
}

function updateSettingsUI(user) {
    const emailSpan = document.getElementById('settingsUserEmail');
    const uidSpan = document.getElementById('settingsUserUid');
    const passSpan = document.getElementById('settingsUserPass');
    if (!emailSpan || !uidSpan || !passSpan) return;
    if (user) {
        emailSpan.innerText = user.email;
        uidSpan.innerText = user.uid;
        const savedPass = localStorage.getItem('userPass_' + user.uid);
        passSpan.innerText = savedPass || 'لم تُحفظ';
    } else {
        emailSpan.innerText = 'غير مسجل';
        uidSpan.innerText = 'لا يوجد';
        passSpan.innerText = 'غير متوفرة';
    }
}

// ============================================
// مراقب حالة المستخدم
// ============================================
auth.onAuthStateChanged(user => {
    updateUI(user);
    if (profileDropdown) profileDropdown.classList.remove('active');
});

// ============================================
// ربط الأحداث
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if (navLoginBtn) {
        navLoginBtn.addEventListener('click', openLoginPopup);
        console.log('✅ زر تسجيل الدخول مربوط');
    }
    if (navSubscribeBtn) {
        navSubscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'subscribe.html';
        });
        console.log('✅ زر اشترك مربوط');
    }
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closeLoginPopup);
        console.log('✅ زر إغلاق النافذة مربوط');
    }
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
        console.log('✅ زر تسجيل الدخول في النافذة مربوط');
    }
    if (popupSignupBtn) {
        popupSignupBtn.addEventListener('click', () => {
            const email = popupEmail.value.trim();
            const pass = popupPassword.value;
            signUp(email, pass);
        });
        console.log('✅ زر إنشاء حساب في النافذة مربوط');
    }
    if (popupResetBtn) {
        popupResetBtn.addEventListener('click', () => {
            const email = popupEmail.value.trim();
            resetPassword(email);
        });
        console.log('✅ زر نسيت كلمة المرور مربوط');
    }
    if (profileLogoutBtn) {
        profileLogoutBtn.addEventListener('click', logOut);
        console.log('✅ زر تسجيل خروج مربوط');
    }
    if (profileIcon) {
        profileIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileDropdown) profileDropdown.classList.toggle('active');
            console.log('✅ تم تبديل قائمة الملف الشخصي');
        });
        console.log('✅ أيقونة الملف الشخصي مربوطة');
    }
    document.addEventListener('click', (e) => {
        if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileIcon) {
            profileDropdown.classList.remove('active');
        }
    });
});

console.log('✅ auth.js تم تحميله بنجاح');
