// ============================================
// auth.js - نظام المصادقة المتكامل (النسخة النهائية)
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
// دوال مساعدة: إظهار/إخفاء Loading
// ============================================
function showLoading(buttonId) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> جاري...`;
}

function hideLoading(buttonId, originalText) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    btn.disabled = false;
    btn.textContent = originalText || 'تسجيل';
}

// ============================================
// إنشاء حساب جديد (سريع مع Loading)
// ============================================
async function createAccount(firstName, lastName, username, email, password) {
    const btnId = 'createAccountBtn';
    showLoading(btnId);
    
    try {
        // 1. إنشاء المستخدم في Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('✅ User created');

        // 2. تحديث الاسم في Auth
        await updateProfile(user, {
            displayName: username
        });

        // 3. إنشاء Document في Firestore بنفس UID
        const userData = {
            uid: user.uid,
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            premium: false,
            premiumUntil: null,
            activeSession: '',
            createdAt: serverTimestamp()
        };
        
        await setDoc(doc(db, 'users', user.uid), userData);
        console.log('✅ Firestore document created');

        // 4. تحديث بيانات المستخدم الحالية
        currentUser = user;
        currentUserData = userData;
        isPremium = false;

        // 5. تحديث الواجهة
        updateUIAfterLogin(user, userData);
        
        // 6. إغلاق النوافذ
        closeAllPopups();

        showMessage('✅ تم إنشاء الحساب بنجاح!');
        return { success: true, user, userData };

    } catch (error) {
        console.error('❌ Error creating account:', error);
        showMessage('❌ ' + error.message, true);
        return { success: false, error: error.message };
    } finally {
        hideLoading(btnId, 'تسجيل');
    }
}

// ============================================
// تسجيل الدخول (سريع)
// ============================================
async function signInWithEmail(email, password) {
    const btnId = 'popupLoginBtn';
    showLoading(btnId);
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('✅ User signed in');

        // جلب البيانات من Firestore
        const userData = await getUserData(user.uid);
        if (userData) {
            currentUserData = userData;
            isPremium = userData.premium || false;
        }

        currentUser = user;
        updateUIAfterLogin(user, userData);
        closeAllPopups();
        
        showMessage('✅ مرحباً ' + (user.displayName || user.email));
        return { success: true, user, userData };

    } catch (error) {
        console.error('❌ Login error:', error);
        showMessage('❌ ' + error.message, true);
        return { success: false, error: error.message };
    } finally {
        hideLoading(btnId, 'دخول');
    }
}

// ============================================
// جلب بيانات المستخدم من Firestore
// ============================================
async function getUserData(uid) {
    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('✅ User data loaded');
            return docSnap.data();
        } else {
            console.warn('⚠️ No document found for uid:', uid);
            return null;
        }
    } catch (error) {
        console.error('❌ Error loading user data:', error);
        return null;
    }
}

// ============================================
// تحديث واجهة المستخدم
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
    
    if (userNameDisplay && userData) {
        userNameDisplay.textContent = `مرحباً بك ${userData.username || user.displayName || 'مستخدم'}`;
    }
    
    if (userEmailDisplay) {
        userEmailDisplay.textContent = user.email || 'بريد غير معروف';
    }
    
    if (profileStatus && userData) {
        const premium = userData.premium === true;
        profileStatus.textContent = premium ? 'Premium' : 'Free';
        profileStatus.style.color = premium ? '#22c55e' : '#94a3b8';
    }
    
    if (profileExpiry && userData?.premiumUntil) {
        const expiryDate = userData.premiumUntil.seconds 
            ? new Date(userData.premiumUntil.seconds * 1000) 
            : new Date(userData.premiumUntil);
        profileExpiry.textContent = `صالح إلى: ${expiryDate.toLocaleDateString('ar-EG')}`;
        profileExpiry.style.display = 'block';
    } else if (profileExpiry) {
        profileExpiry.style.display = 'none';
    }
    
    // تحديث زر الاشتراك
    updatePremiumFeatures(userData?.premium === true);
}

// ============================================
// تحديث زر الاشتراك حسب Premium
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
        closeAllPopups();
        showMessage('✅ تم تسجيل الخروج');
    } catch (error) {
        console.error('❌ Logout error:', error);
        showMessage('❌ ' + error.message, true);
    }
}

// ============================================
// نسيت كلمة المرور - إرسال عبر واتساب
// ============================================
async function resetPassword(email, newPassword) {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return { success: false, error: '❌ لا يوجد حساب بهذا البريد' };
        }
        
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        
        const phoneNumber = '212687561491';
        const message = `السلام،\nنسيت كلمة المرور وبغيت نبدلها.\n\n📧 البريد: ${email}\n🔑 كلمة السر الجديدة: ${newPassword}\n👤 المستخدم: ${userData.username || 'غير محدد'}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        return { success: true, message: '✅ تم فتح واتساب' };
        
    } catch (error) {
        console.error('❌ Reset password error:', error);
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
// إغلاق جميع النوافذ
// ============================================
function closeAllPopups() {
    document.getElementById('loginPopup')?.classList.remove('active');
    document.getElementById('signupPopup')?.classList.remove('active');
    document.getElementById('forgotPasswordPopup')?.classList.remove('active');
}

// ============================================
// تبديل النوافذ (داخل نفس البطاقة)
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
// مراقبة حالة المصادقة (تبقى الجلسة)
// ============================================
function initAuthListener() {
    console.log('🔄 Auth listener started');
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log('📡 User signed in:', user.email);
            currentUser = user;
            const userData = await getUserData(user.uid);
            if (userData) {
                currentUserData = userData;
                isPremium = userData.premium || false;
            } else {
                // إذا لم يوجد Document (حالة نادرة)
                console.warn('⚠️ No Firestore document for user, creating one...');
                const newData = {
                    uid: user.uid,
                    username: user.displayName || user.email?.split('@')[0] || '',
                    firstName: '',
                    lastName: '',
                    email: user.email,
                    premium: false,
                    premiumUntil: null,
                    activeSession: '',
                    createdAt: serverTimestamp()
                };
                await setDoc(doc(db, 'users', user.uid), newData);
                currentUserData = newData;
                isPremium = false;
            }
            updateUIAfterLogin(user, currentUserData);
        } else {
            console.log('👤 No user signed in');
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
        max-width: 90%;
        text-align: center;
    `;
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 3000);
}

// ============================================
// ربط الأحداث
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded, initializing auth...');
    
    // زر تسجيل الدخول
    document.getElementById('navLoginBtn')?.addEventListener('click', () => {
        document.getElementById('loginPopup')?.classList.add('active');
    });
    
    // إغلاق النوافذ
    document.querySelectorAll('.close-btn, .auth-close-btn').forEach(btn => {
        btn?.addEventListener('click', closeAllPopups);
    });
    
    // إغلاق عند الضغط خارج النافذة
    ['loginPopup', 'signupPopup', 'forgotPasswordPopup'].forEach(id => {
        const el = document.getElementById(id);
        el?.addEventListener('click', (e) => {
            if (e.target === el) el.classList.remove('active');
        });
    });
    
    // التبديل
    document.getElementById('switchToSignup')?.addEventListener('click', switchToSignup);
    document.getElementById('switchToLogin')?.addEventListener('click', switchToLogin);
    document.getElementById('forgotPasswordLink')?.addEventListener('click', switchToForgot);
    
    // تسجيل الدخول
    document.getElementById('popupLoginBtn')?.addEventListener('click', async () => {
        const email = document.getElementById('popupEmail')?.value.trim();
        const password = document.getElementById('popupPassword')?.value;
        if (!email || !password) {
            showMessage('⚠️ الرجاء إدخال البريد وكلمة السر', true);
            return;
        }
        await signInWithEmail(email, password);
    });
    
    // إنشاء حساب
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
        await createAccount(firstName, lastName, username, email, password);
    });
    
    // إرسال واتساب
    document.getElementById('resetPasswordBtn')?.addEventListener('click', async () => {
        const email = document.getElementById('forgotEmail')?.value.trim();
        const newPassword = document.getElementById('forgotNewPassword')?.value;
        if (!email || !newPassword) {
            showMessage('⚠️ الرجاء إدخال البريد وكلمة السر الجديدة', true);
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
    
    // تفعيل زر العين
    togglePasswordVisibility('popupPassword', 'togglePasswordBtn');
    togglePasswordVisibility('signupPassword', 'toggleSignupPasswordBtn');
    
    // Enter/Escape
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
            closeAllPopups();
        }
    });
    
    // تسجيل الخروج
    document.getElementById('profileLogoutBtn')?.addEventListener('click', signOutUser);
    
    // فتح/إغلاق Profile Dropdown
    document.getElementById('profileIcon')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('profileDropdown')?.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('profileDropdown');
        const icon = document.getElementById('profileIcon');
        if (dropdown && icon && !dropdown.contains(e.target) && !icon.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // بدء الاستماع
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
    signOutUser,
    resetPassword,
    updatePremiumFeatures,
    switchToLogin,
    switchToSignup,
    switchToForgot,
    closeAllPopups
};

window.currentUser = currentUser;
window.currentUserData = currentUserData;
window.isPremium = isPremium;
window.createAccount = createAccount;
window.signInWithEmail = signInWithEmail;
window.getUserData = getUserData;
window.signOutUser = signOutUser;
window.resetPassword = resetPassword;
window.closeAllPopups = closeAllPopups;

console.log('✅ Auth system ready (persistent)');
