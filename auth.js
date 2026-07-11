// ============================================
// auth.js - نظام تسجيل الدخول
// ============================================

import { auth, db, provider, signInWithPopup, signOut, onAuthStateChanged, doc, getDoc, setDoc, serverTimestamp } from './firebase.js';

// ============================================
// حالة المستخدم (متغير عالمي)
// ============================================
let currentUser = null;
let isPremium = false;

// ============================================
// تسجيل الدخول بـ Google
// ============================================
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        console.log('✅ تم تسجيل الدخول:', user.email);
        
        // حفظ المستخدم في Firestore
        await saveUserToFirestore(user);
        
        // تحديث واجهة المستخدم
        updateUIAfterLogin(user);
        
        return { success: true, user };
    } catch (error) {
        console.error('❌ خطأ في تسجيل الدخول:', error);
        showMessage('❌ فشل تسجيل الدخول: ' + error.message);
        return { success: false, error: error.message };
    }
}

// ============================================
// حفظ المستخدم في Firestore
// ============================================
async function saveUserToFirestore(user) {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) {
        // مستخدم جديد - إنشاء ملف
        await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName || 'مستخدم',
            photoURL: user.photoURL || '',
            premium: false,
            premiumUntil: null,
            studyMinutes: 0,
            createdAt: serverTimestamp(),
            activeSession: null,
            role: 'user'
        });
        console.log('✅ تم إنشاء مستخدم جديد:', user.email);
    } else {
        console.log('✅ مستخدم موجود:', user.email);
    }
}

// ============================================
// قراءة بيانات المستخدم من Firestore
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
        console.error('❌ خطأ في قراءة البيانات:', error);
        return null;
    }
}

// ============================================
// تحديث واجهة المستخدم بعد تسجيل الدخول
// ============================================
function updateUIAfterLogin(user) {
    const loginBtn = document.getElementById('navLoginBtn');
    const profileIcon = document.getElementById('profileIcon');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (profileIcon) {
        profileIcon.style.display = 'flex';
        profileIcon.innerHTML = user.displayName ? user.displayName.charAt(0).toUpperCase() : '👤';
    }
    
    // إغلاق نافذة تسجيل الدخول
    const popup = document.getElementById('loginPopup');
    if (popup) popup.style.display = 'none';
    
    showMessage('✅ مرحباً ' + (user.displayName || user.email));
    
    // تحديث Premium
    checkPremiumStatus(user.uid);
}

// ============================================
// التحقق من حالة Premium
// ============================================
async function checkPremiumStatus(uid) {
    const data = await getUserData(uid);
    if (data) {
        isPremium = data.premium || false;
        
        // التحقق من انتهاء الاشتراك
        if (data.premiumUntil) {
            const now = Date.now();
            const expiry = data.premiumUntil.seconds ? data.premiumUntil.seconds * 1000 : data.premiumUntil;
            
            if (now > expiry) {
                // انتهى الاشتراك
                const userRef = doc(db, 'users', uid);
                await updateDoc(userRef, {
                    premium: false,
                    premiumUntil: null
                });
                isPremium = false;
            }
        }
        
        console.log('💰 Premium:', isPremium);
        updatePremiumUI(isPremium);
    }
}

// ============================================
// تحديث واجهة Premium
// ============================================
function updatePremiumUI(premium) {
    const premiumElements = document.querySelectorAll('.premium-only');
    premiumElements.forEach(el => {
        el.style.display = premium ? 'block' : 'none';
    });
}

// ============================================
// مراقبة حالة تسجيل الدخول
// ============================================
function initAuthListener() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            await saveUserToFirestore(user);
            updateUIAfterLogin(user);
            await checkPremiumStatus(user.uid);
        } else {
            currentUser = null;
            isPremium = false;
            // تحديث واجهة المستخدم للخروج
            const loginBtn = document.getElementById('navLoginBtn');
            const profileIcon = document.getElementById('profileIcon');
            
            if (loginBtn) loginBtn.style.display = 'block';
            if (profileIcon) {
                profileIcon.style.display = 'none';
                profileIcon.innerHTML = '👤';
            }
        }
    });
}

// ============================================
// تسجيل الخروج
// ============================================
async function signOutUser() {
    try {
        await signOut(auth);
        showMessage('✅ تم تسجيل الخروج');
        currentUser = null;
        isPremium = false;
    } catch (error) {
        console.error('❌ خطأ في تسجيل الخروج:', error);
    }
}

// ============================================
// إظهار رسالة
// ============================================
function showMessage(msg) {
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
        background: #2d2f36;
        color: #e0e0e0;
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
// تهيئة الأحداث
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // زر تسجيل الدخول
    const loginBtn = document.getElementById('navLoginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', signInWithGoogle);
    }
    
    // زر تسجيل الدخول في النافذة المنبثقة
    const popupLoginBtn = document.getElementById('popupLoginBtn');
    if (popupLoginBtn) {
        popupLoginBtn.addEventListener('click', signInWithGoogle);
    }
    
    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('profileLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', signOutUser);
    }
    
    // بدء الاستماع لحالة Auth
    initAuthListener();
});

// تصدير الدوال للاستخدام العالمي
export { 
    currentUser, 
    isPremium, 
    signInWithGoogle, 
    signOutUser, 
    getUserData,
    checkPremiumStatus
};

// جعلها متاحة عالمياً
window.signInWithGoogle = signInWithGoogle;
window.signOutUser = signOutUser;
window.getUserData = getUserData;

console.log('✅ نظام Auth جاهز');
