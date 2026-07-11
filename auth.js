// ============================================
// auth.js - نظام تسجيل الدخول وإدارة الحساب
// ============================================

import { 
    auth, db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    doc, getDoc, setDoc, updateDoc, serverTimestamp,
    collection, query, where, getDocs
} from './firebase.js';

// ============================================
// الحالة العامة
// ============================================
let currentUser = null;
let currentUserData = null;
let isPremium = false;

// ============================================
// إنشاء حساب جديد
// ============================================
async function createAccount(firstName, lastName, username, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, {
            displayName: username
        });
        
        const userData = {
            uid: user.uid,
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            plan: 'basic',
            premiumUntil: null,
            createdAt: serverTimestamp()
        };
        
        await setDoc(doc(db, 'users', user.uid), userData);
        
        console.log('✅ تم إنشاء الحساب:', email);
        return { success: true, user, userData };
        
    } catch (error) {
        console.error('❌ خطأ في إنشاء الحساب:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// تسجيل الدخول بالبريد وكلمة المرور
// ============================================
async function signInWithEmail(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userData = await getUserData(user.uid);
        
        return { success: true, user, userData };
    } catch (error) {
        console.error('❌ خطأ في تسجيل الدخول:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// جلب بيانات المستخدم من Firestore
// ============================================
async function getUserData(uid) {
    try {
        const userRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error('❌ خطأ في جلب البيانات:', error);
        return null;
    }
}

// ============================================
// تحديث بيانات المستخدم
// ============================================
async function updateUserData(uid, data) {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, data);
        console.log('✅ تم تحديث بيانات المستخدم');
        return { success: true };
    } catch (error) {
        console.error('❌ خطأ في تحديث البيانات:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// التحقق من حالة Premium
// ============================================
async function checkPremiumStatus(uid) {
    const data = await getUserData(uid);
    if (!data) return { premium: false, plan: 'basic' };
    
    let premium = data.plan === 'premium';
    let premiumUntil = data.premiumUntil || null;
    
    if (premium && premiumUntil) {
        const now = Date.now();
        const expiry = premiumUntil.seconds ? premiumUntil.seconds * 1000 : premiumUntil;
        
        if (now > expiry) {
            await updateUserData(uid, {
                plan: 'basic',
                premiumUntil: null
            });
            premium = false;
            premiumUntil = null;
            console.log('⏰ انتهى الاشتراك للمستخدم:', uid);
        }
    }
    
    return { premium, plan: premium ? 'premium' : 'basic', premiumUntil };
}

// ============================================
// تحديث واجهة المستخدم بعد تسجيل الدخول
// ============================================
function updateUIAfterLogin(user, userData) {
    const navLoginBtn = document.getElementById('navLoginBtn');
    const profileIcon = document.getElementById('profileIcon');
    const profileDropdown = document.getElementById('profileDropdown');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    const profileStatus = document.getElementById('profileStatus');
    const profileExpiry = document.getElementById('profileExpiry');
    
    if (!user) {
        // غير مسجل
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (profileIcon) profileIcon.style.display = 'none';
        if (profileDropdown) profileDropdown.classList.remove('active');
        if (userNameDisplay) userNameDisplay.textContent = 'مستخدم';
        if (userEmailDisplay) userEmailDisplay.textContent = 'غير مسجل';
        if (profileStatus) profileStatus.textContent = 'Free';
        if (profileExpiry) profileExpiry.style.display = 'none';
        return;
    }
    
    // مسجل
    if (navLoginBtn) navLoginBtn.style.display = 'none';
    
    if (profileIcon) {
        profileIcon.style.display = 'flex';
        profileIcon.textContent = user.displayName ? user.displayName.charAt(0).toUpperCase() : '👤';
    }
    
    // عرض اسم المستخدم (مرحباً بك محمد)
    if (userNameDisplay && userData) {
        userNameDisplay.textContent = `مرحباً بك ${userData.username || user.displayName || 'مستخدم'}`;
    }
    
    if (userEmailDisplay) {
        userEmailDisplay.textContent = user.email || 'بريد غير معروف';
    }
    
    // عرض نوع الحساب
    if (profileStatus && userData) {
        const isPremium = userData.plan === 'premium';
        profileStatus.textContent = isPremium ? 'Premium' : 'Free';
        profileStatus.style.color = isPremium ? '#22c55e' : '#94a3b8';
    }
    
    // عرض تاريخ الانتهاء للمستخدمين Premium
    if (profileExpiry && userData?.premiumUntil) {
        const expiryDate = userData.premiumUntil.seconds 
            ? new Date(userData.premiumUntil.seconds * 1000) 
            : new Date(userData.premiumUntil);
        profileExpiry.textContent = `صالح إلى: ${expiryDate.toLocaleDateString('ar-EG')}`;
        profileExpiry.style.display = 'block';
    } else if (profileExpiry) {
        profileExpiry.style.display = 'none';
    }
    
    // إغلاق النوافذ
    document.getElementById('loginPopup')?.classList.remove('active');
    document.getElementById('signupPopup')?.classList.remove('active');
    document.getElementById('forgotPasswordPopup')?.classList.remove('active');
    
    // تحديث المزايا
    updatePremiumFeatures(userData?.plan === 'premium');
}

// ============================================
// تحديث المزايا حسب الـ Premium
// ============================================
function updatePremiumFeatures(isPremium) {
    const subscribeBtn = document.getElementById('navSubscribeBtn');
    if (subscribeBtn) {
        if (isPremium) {
            subscribeBtn.textContent = '✅ Premium';
            subscribeBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        } else {
            subscribeBtn.textContent = 'اشترك';
            subscribeBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        }
    }
}

// ============================================
// تسجيل الخروج
// ============================================
async function signOutUser() {
    try {
        await signOut(auth);
        currentUser = null;
        currentUserData = null;
        isPremium = false;
        updateUIAfterLogin(null, null);
        showMessage('✅ تم تسجيل الخروج');
    } catch (error) {
        console.error('❌ خطأ في تسجيل الخروج:', error);
    }
}

// ============================================
// نسيت كلمة المرور - إرسال عبر واتساب
// ============================================
async function resetPassword(email, newPassword) {
    try {
        // البحث عن المستخدم في Firestore
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return { success: false, error: '❌ لا يوجد حساب بهذا البريد الإلكتروني' };
        }
        
        // جلب بيانات المستخدم
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        
        // إرسال رسالة واتساب
        const phoneNumber = '212687561491';
        const message = `السلام،\nنسيت كلمة المرور وبغيت نبدلها.\n\n📧 البريد الإلكتروني: ${email}\n🔑 كلمة السر الجديدة: ${newPassword}\n👤 اسم المستخدم: ${userData.username || 'غير محدد'}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        return { 
            success: true, 
            message: '✅ تم فتح واتساب لإرسال الطلب',
            whatsappUrl: whatsappUrl
        };
        
    } catch (error) {
        console.error('❌ خطأ في إعادة تعيين كلمة المرور:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// إظهار/إخفاء كلمة السر
// ============================================
function togglePasswordVisibility(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    
    if (!input || !button) return;
    
    button.addEventListener('click', function() {
        if (input.type === 'password') {
            input.type = 'text';
            this.textContent = '🙈';
        } else {
            input.type = 'password';
            this.textContent = '👁️';
        }
    });
}

// ============================================
// مراقبة حالة تسجيل الدخول
// ============================================
function initAuthListener() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            currentUserData = await getUserData(user.uid);
            
            if (currentUserData) {
                const status = await checkPremiumStatus(user.uid);
                isPremium = status.premium;
                if (currentUserData.plan !== status.plan) {
                    currentUserData.plan = status.plan;
                    currentUserData.premiumUntil = status.premiumUntil;
                }
            }
            
            updateUIAfterLogin(user, currentUserData);
        } else {
            currentUser = null;
            currentUserData = null;
            isPremium = false;
            updateUIAfterLogin(null, null);
        }
    });
}

// ============================================
// إظهار رسالة
// ============================================
function showMessage(msg, isError = false) {
    let bubble = document.getElementById('tempMsg');
    if (bubble) bubble.remove();
    bubble = document.createElement('div');
    bubble.id = 'tempMsg';
    bubble.textContent = msg;
    bubble.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: ${isError ? '#dc2626' : '#2d2f36'};
        color: #ffffff;
        padding: 8px 20px;
        border-radius: 40px;
        font-size: 0.8rem;
        z-index: 13999;
        opacity: 0.95;
        box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 3000);
}

// ============================================
// تبديل النوافذ (Login ↔ Signup ↔ Forgot)
// ============================================
function switchToLogin() {
    document.getElementById('signupPopup')?.classList.remove('active');
    document.getElementById('forgotPasswordPopup')?.classList.remove('active');
    document.getElementById('loginPopup')?.classList.add('active');
}

function switchToSignup() {
    document.getElementById('loginPopup')?.classList.remove('active');
    document.getElementById('forgotPasswordPopup')?.classList.remove('active');
    document.getElementById('signupPopup')?.classList.add('active');
}

function switchToForgot() {
    document.getElementById('loginPopup')?.classList.remove('active');
    document.getElementById('signupPopup')?.classList.remove('active');
    document.getElementById('forgotPasswordPopup')?.classList.add('active');
}

// ============================================
// ربط الأحداث
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // === زر تسجيل الدخول ===
    document.getElementById('navLoginBtn')?.addEventListener('click', () => {
        document.getElementById('loginPopup')?.classList.add('active');
    });
    
    // === إغلاق النوافذ ===
    document.querySelectorAll('.close-btn, .auth-close-btn').forEach(btn => {
        btn?.addEventListener('click', () => {
            document.getElementById('loginPopup')?.classList.remove('active');
            document.getElementById('signupPopup')?.classList.remove('active');
            document.getElementById('forgotPasswordPopup')?.classList.remove('active');
        });
    });
    
    // === إغلاق عند الضغط خارج النافذة ===
    ['loginPopup', 'signupPopup', 'forgotPasswordPopup'].forEach(id => {
        const el = document.getElementById(id);
        el?.addEventListener('click', (e) => {
            if (e.target === el) {
                el.classList.remove('active');
            }
        });
    });
    
    // === التبديل بين النوافذ ===
    document.getElementById('switchToSignup')?.addEventListener('click', switchToSignup);
    document.getElementById('switchToLogin')?.addEventListener('click', switchToLogin);
    document.getElementById('forgotPasswordLink')?.addEventListener('click', switchToForgot);
    
    // === زر تسجيل الدخول ===
    document.getElementById('popupLoginBtn')?.addEventListener('click', async () => {
        const email = document.getElementById('popupEmail')?.value.trim();
        const password = document.getElementById('popupPassword')?.value;
        
        if (!email || !password) {
            showMessage('⚠️ الرجاء إدخال البريد وكلمة السر', true);
            return;
        }
        
        const result = await signInWithEmail(email, password);
        if (result.success) {
            showMessage('✅ مرحباً ' + (result.user.displayName || result.user.email));
            document.getElementById('loginPopup')?.classList.remove('active');
        } else {
            showMessage('❌ ' + result.error, true);
        }
    });
    
    // === زر إنشاء حساب ===
    document.getElementById('createAccountBtn')?.addEventListener('click', async () => {
        const firstName = document.getElementById('signupFirstName')?.value.trim();
        const lastName = document.getElementById('signupLastName')?.value.trim();
        const username = document.getElementById('signupUsername')?.value.trim();
        const email = document.getElementById('signupEmail')?.value.trim();
        const password = document.getElementById('signupPassword')?.value;
        
        if (!firstName || !lastName || !username || !email || !password) {
            showMessage('⚠️ الرجاء ملء جميع الحقول', true);
            return;
        }
        
        if (password.length < 6) {
            showMessage('⚠️ كلمة السر يجب أن تكون 6 أحرف على الأقل', true);
            return;
        }
        
        const result = await createAccount(firstName, lastName, username, email, password);
        if (result.success) {
            showMessage('✅ تم إنشاء الحساب بنجاح! 🎉');
            document.getElementById('signupPopup')?.classList.remove('active');
        } else {
            showMessage('❌ ' + result.error, true);
        }
    });
    
    // === زر إرسال عبر واتساب ===
    document.getElementById('resetPasswordBtn')?.addEventListener('click', async () => {
        const email = document.getElementById('forgotEmail')?.value.trim();
        const newPassword = document.getElementById('forgotNewPassword')?.value;
        
        if (!email || !newPassword) {
            showMessage('⚠️ الرجاء إدخال البريد الإلكتروني وكلمة السر الجديدة', true);
            return;
        }
        
        if (newPassword.length < 6) {
            showMessage('⚠️ كلمة السر يجب أن تكون 6 أحرف على الأقل', true);
            return;
        }
        
        const result = await resetPassword(email, newPassword);
        if (result.success) {
            showMessage(result.message);
            document.getElementById('forgotPasswordPopup')?.classList.remove('active');
        } else {
            showMessage('❌ ' + result.error, true);
        }
    });
    
    // === تفعيل زر العين ===
    togglePasswordVisibility('popupPassword', 'togglePasswordBtn');
    togglePasswordVisibility('signupPassword', 'toggleSignupPasswordBtn');
    
    // === دعم الضغط على Enter ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (document.getElementById('loginPopup')?.classList.contains('active')) {
                document.getElementById('popupLoginBtn')?.click();
            } else if (document.getElementById('signupPopup')?.classList.contains('active')) {
                document.getElementById('createAccountBtn')?.click();
            } else if (document.getElementById('forgotPasswordPopup')?.classList.contains('active')) {
                document.getElementById('resetPasswordBtn')?.click();
            }
        }
        if (e.key === 'Escape') {
            document.getElementById('loginPopup')?.classList.remove('active');
            document.getElementById('signupPopup')?.classList.remove('active');
            document.getElementById('forgotPasswordPopup')?.classList.remove('active');
        }
    });
    
    // === تسجيل الخروج ===
    document.getElementById('profileLogoutBtn')?.addEventListener('click', signOutUser);
    
    // === فتح/إغلاق الـ Profile Dropdown ===
    document.getElementById('profileIcon')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('profileDropdown')?.classList.toggle('active');
    });
    
    // === إغلاق الـ Profile عند النقر خارجها ===
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('profileDropdown');
        const icon = document.getElementById('profileIcon');
        if (dropdown && icon && !dropdown.contains(e.target) && !icon.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // === بدء الاستماع ===
    initAuthListener();
});

// ============================================
// تصدير للاستخدام العالمي
// ============================================
export {
    currentUser,
    currentUserData,
    isPremium,
    createAccount,
    signInWithEmail,
    getUserData,
    updateUserData,
    checkPremiumStatus,
    signOutUser,
    resetPassword,
    updatePremiumFeatures,
    switchToLogin,
    switchToSignup,
    switchToForgot
};

window.currentUser = currentUser;
window.currentUserData = currentUserData;
window.isPremium = isPremium;
window.createAccount = createAccount;
window.signInWithEmail = signInWithEmail;
window.getUserData = getUserData;
window.updateUserData = updateUserData;
window.checkPremiumStatus = checkPremiumStatus;
window.signOutUser = signOutUser;
window.resetPassword = resetPassword;
window.updatePremiumFeatures = updatePremiumFeatures;
window.switchToLogin = switchToLogin;
window.switchToSignup = switchToSignup;
window.switchToForgot = switchToForgot;

console.log('✅ Auth System جاهز (مع تبديل النوافذ ونسيت كلمة المرور)');
