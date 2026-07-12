// ============================================
// auth.js - نظام المصادقة مع Firebase + Firestore
// ============================================

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
const profileStatus = document.getElementById('profileStatus');
const profileLogoutBtn = document.getElementById('profileLogoutBtn');
const navLoginBtn = document.getElementById('navLoginBtn');
const navSubscribeBtn = document.getElementById('navSubscribeBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsModal = document.getElementById('closeSettingsModal');

// عناصر الملف الشخصي الجديد (مودال)
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profileModal');
const closeProfileModal = document.getElementById('closeProfileModal');
const profileDisplayName = document.getElementById('profileDisplayName');
const profileUid = document.getElementById('profileUid');
const profileExpiry = document.getElementById('profileExpiry');
const profileStatusModal = document.getElementById('profileStatusModal');
const profileLogoutBtnModal = document.getElementById('profileLogoutBtnModal');

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
// دوال المصادقة (Firebase)
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
        localStorage.setItem('userPass_' + user.uid, password);

        // ✅ إنشاء مستند المستخدم في Firestore
        await createUserDocument(user);

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
        closeProfileModalFunc();
    } catch (error) { console.error(error); }
}

// ============================================
// نافذة الملف الشخصي (مودال)
// ============================================

function openProfileModal() {
    if (profileModal) profileModal.classList.add('active');
}

function closeProfileModalFunc() {
    if (profileModal) profileModal.classList.remove('active');
}

function updateProfileModal(user) {
    if (!user) {
        if (profileDisplayName) profileDisplayName.innerText = 'غير مسجل';
        if (profileUid) profileUid.innerText = '---';
        if (profileExpiry) profileExpiry.innerText = '';
        if (profileStatusModal) {
            profileStatusModal.innerHTML = '<span style="color: #94a3b8;">🆓 مجاني</span>';
        }
        return;
    }
    
    try {
        const docRef = db.collection('users').doc(user.uid);
        docRef.get().then(docSnap => {
            if (docSnap.exists) {
                const data = docSnap.data();
                if (profileDisplayName) {
                    profileDisplayName.innerText = data.username || user.email.split('@')[0] || 'مستخدم';
                }
                if (profileUid) {
                    const uid = user.uid;
                    profileUid.innerText = uid.length > 24 ? uid.substring(0, 24) + '...' : uid;
                }
                
                // الحالة
                window.getUserStatusGlobal().then(status => {
                    if (profileStatusModal) {
                        if (status === 'premium') {
                            profileStatusModal.innerHTML = '<span style="color: #10b981;">⭐ مشترك (Premium)</span>';
                        } else {
                            profileStatusModal.innerHTML = '<span style="color: #94a3b8;">🆓 مجاني (Free)</span>';
                        }
                    }
                });
                
                // تاريخ الانتهاء
                if (profileExpiry && data.premiumUntil) {
                    const date = new Date(data.premiumUntil);
                    const formatted = date.toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });
                    profileExpiry.innerText = `📅 ينتهي: ${formatted}`;
                } else if (profileExpiry) {
                    profileExpiry.innerText = '';
                }
            }
        }).catch(err => {
            console.warn('⚠️ فشل جلب بيانات المستخدم:', err);
        });
    } catch (err) {
        console.warn('⚠️ فشل جلب بيانات المستخدم:', err);
    }
}

// ============================================
// تحديث واجهة المستخدم
// ============================================
async function updateUI(user) {
    if (user) {
        if (profileIcon) profileIcon.style.display = 'flex';
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-block';
        if (profileEmail) profileEmail.innerText = user.email;
        localStorage.setItem('zertiva_email', user.email);

        try {
            const status = await window.getUserStatusGlobal();
            if (profileStatus) {
                if (status === 'premium') {
                    profileStatus.innerHTML = '<span style="color: #10b981;">⭐ مشترك (Premium)</span>';
                } else {
                    profileStatus.innerHTML = '<span style="color: #94a3b8;">🆓 مجاني (Free)</span>';
                }
            }
            // تحديث المودال أيضاً
            updateProfileModal(user);
        } catch (error) {
            console.warn('⚠️ فشل جلب حالة المستخدم:', error);
        }
    } else {
        if (profileIcon) profileIcon.style.display = 'none';
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-block';
        if (profileEmail) profileEmail.innerText = 'غير مسجل';
        if (profileStatus) {
            profileStatus.innerHTML = '';
        }
        updateProfileModal(null);
    }
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
    updateSettingsUI(user);
    if (profileDropdown) profileDropdown.classList.remove('active');
});

// ============================================
// ربط الأحداث
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // 1. زر تسجيل الدخول
    if (navLoginBtn) {
        navLoginBtn.addEventListener('click', openLoginPopup);
        console.log('✅ زر تسجيل الدخول مربوط');
    }
    
    // 2. زر اشترك
    if (navSubscribeBtn) {
        navSubscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'subscribe.html';
        });
        console.log('✅ زر اشترك مربوط');
    }
    
    // 3. إغلاق النافذة
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closeLoginPopup);
        console.log('✅ زر إغلاق النافذة مربوط');
    }
    
    // 4. إغلاق النافذة بالخارج
    if (loginPopup) {
        loginPopup.addEventListener('click', (e) => {
            if (e.target === loginPopup) closeLoginPopup();
        });
    }
    
    // 5. أزرار النافذة
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
    
    // 6. تسجيل الخروج (القائمة المنسدلة)
    if (profileLogoutBtn) {
        profileLogoutBtn.addEventListener('click', logOut);
        console.log('✅ زر تسجيل خروج مربوط');
    }
    
    // 7. أيقونة الملف الشخصي (القائمة المنسدلة)
    if (profileIcon) {
        profileIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileDropdown) profileDropdown.classList.toggle('active');
            console.log('✅ تم تبديل قائمة الملف الشخصي');
        });
        console.log('✅ أيقونة الملف الشخصي مربوطة');
    }
    
    // 8. زر الملف الشخصي الجديد (مودال)
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const user = auth.currentUser;
            if (user) {
                updateProfileModal(user);
                openProfileModal();
            } else {
                alert('⚠️ يرجى تسجيل الدخول أولاً');
            }
        });
        console.log('✅ زر الملف الشخصي (مودال) مربوط');
    }
    
    // 9. إغلاق نافذة الملف الشخصي
    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', closeProfileModalFunc);
        console.log('✅ زر إغلاق الملف الشخصي مربوط');
    }
    
    // 10. إغلاق نافذة الملف الشخصي بالخارج
    if (profileModal) {
        profileModal.addEventListener('click', function(e) {
            if (e.target === profileModal) closeProfileModalFunc();
        });
    }
    
    // 11. زر تسجيل الخروج في نافذة الملف الشخصي
    if (profileLogoutBtnModal) {
        profileLogoutBtnModal.addEventListener('click', function() {
            closeProfileModalFunc();
            logOut();
        });
        console.log('✅ زر خروج في الملف الشخصي مربوط');
    }
    
    // 12. زر الإعدادات
    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            settingsModal.classList.add('active');
            console.log('✅ تم فتح نافذة الإعدادات');
        });
        console.log('✅ زر الإعدادات مربوط');
    }
    
    if (closeSettingsModal) {
        closeSettingsModal.addEventListener('click', function() {
            settingsModal.classList.remove('active');
        });
        console.log('✅ زر إغلاق الإعدادات مربوط');
    }
    
    if (settingsModal) {
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('active');
            }
        });
    }
    
    // 13. إغلاق القائمة المنسدلة
    document.addEventListener('click', (e) => {
        if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileIcon) {
            profileDropdown.classList.remove('active');
        }
    });
});

console.log('✅ auth.js (مع Firebase + Firestore) تم تحميله بنجاح');
