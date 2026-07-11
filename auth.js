// ============================================
// auth.js - نظام إنشاء الحساب وتسجيل الدخول
// ============================================

import { 
    auth, db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    doc, getDoc, setDoc, updateDoc, serverTimestamp
} from './firebase.js';

// ============================================
// الحالة العامة
// ============================================
let currentUser = null;
let currentUserData = null;
let isPremium = false;

async function createAccount(firstName, lastName, username, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`
        });
        
        const userData = {
            uid: user.uid,
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            plan: 'basic',
            premiumUntil: null,
            studyMinutes: 0,
            createdAt: serverTimestamp(),
            activeSession: null
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
        
        // جلب بيانات المستخدم من Firestore
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
    
    // التحقق من انتهاء الاشتراك
    if (premium && premiumUntil) {
        const now = Date.now();
        const expiry = premiumUntil.seconds ? premiumUntil.seconds * 1000 : premiumUntil;
        
        if (now > expiry) {
            // انتهى الاشتراك - التغيير تلقائياً إلى basic
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
// تحديث واجهة المستخدم
// ============================================
function updateUIAfterLogin(user, userData) {
    if (!user) {
        // غير مسجل
        document.getElementById('navLoginBtn').style.display = 'block';
        document.getElementById('profileIcon').style.display = 'none';
        document.getElementById('profileDropdown').classList.remove('active');
        return;
    }
    
    // مسجل
    document.getElementById('navLoginBtn').style.display = 'none';
    const profileIcon = document.getElementById('profileIcon');
    profileIcon.style.display = 'flex';
    profileIcon.textContent = user.displayName ? user.displayName.charAt(0).toUpperCase() : '👤';
    
    // تحديث الـ Profile Dropdown
    document.getElementById('userNameDisplay').textContent = user.displayName || 'مستخدم';
    document.getElementById('userEmailDisplay').textContent = user.email || 'بريد غير معروف';
    
    // المستوى
    const levelDisplay = document.getElementById('userLevelDisplay');
    if (levelDisplay && userData) {
        levelDisplay.textContent = userData.level || 'B1';
    }
    
    // نوع الحساب
    const statusDisplay = document.getElementById('profileStatus');
    if (statusDisplay && userData) {
        const isPremium = userData.plan === 'premium';
        statusDisplay.textContent = isPremium ? '✅ Premium User' : '📋 Basic User';
        statusDisplay.style.color = isPremium ? '#22c55e' : '#94a3b8';
    }
    
    // تاريخ انتهاء الاشتراك
    const expiryDisplay = document.getElementById('profileExpiry');
    if (expiryDisplay && userData?.premiumUntil) {
        const expiryDate = userData.premiumUntil.seconds 
            ? new Date(userData.premiumUntil.seconds * 1000) 
            : new Date(userData.premiumUntil);
        expiryDisplay.textContent = `ينتهي: ${expiryDate.toLocaleDateString()}`;
        expiryDisplay.style.display = 'block';
    } else if (expiryDisplay) {
        expiryDisplay.style.display = 'none';
    }
    
    // إغلاق نافذة التسجيل
    document.getElementById('signupPopup')?.classList.remove('active');
    document.getElementById('loginPopup')?.classList.remove('active');
    
    // تحديث المزايا حسب الـ Premium
    updatePremiumFeatures(userData?.plan === 'premium');
}

// ============================================
// تحديث المزايا حسب الـ Premium
// ============================================
function updatePremiumFeatures(isPremium) {
    const premiumElements = document.querySelectorAll('.premium-only');
    premiumElements.forEach(el => {
        el.style.display = isPremium ? 'block' : 'none';
    });
    
    // تحديث زر الاشتراك
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
// مراقبة حالة تسجيل الدخول
// ============================================
function initAuthListener() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            currentUserData = await getUserData(user.uid);
            
            // التحقق من Premium
            if (currentUserData) {
                const status = await checkPremiumStatus(user.uid);
                isPremium = status.premium;
                // تحديث البيانات إذا تغيرت
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
// ربط الأحداث
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // زر تسجيل الدخول (يفتح نافذة تسجيل الدخول)
    document.getElementById('navLoginBtn')?.addEventListener('click', () => {
        document.getElementById('loginPopup').classList.add('active');
    });
    
    // زر إنشاء حساب (يفتح نافذة التسجيل)
    document.getElementById('signupBtn')?.addEventListener('click', () => {
        document.getElementById('signupPopup').classList.add('active');
    });
    
    // زر إغلاق نافذة تسجيل الدخول
    document.getElementById('closeLoginPopup')?.addEventListener('click', () => {
        document.getElementById('loginPopup').classList.remove('active');
    });
    
    // زر إغلاق نافذة التسجيل
    document.getElementById('closeSignupPopup')?.addEventListener('click', () => {
        document.getElementById('signupPopup').classList.remove('active');
    });
    
    // إغلاق النوافذ عند الضغط خارجها
    document.getElementById('loginPopup')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('active');
        }
    });
    document.getElementById('signupPopup')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('active');
        }
    });
    
    // زر تسجيل الدخول بالبريد
    document.getElementById('loginEmailBtn')?.addEventListener('click', async () => {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            showMessage('⚠️ الرجاء إدخال البريد وكلمة السر', true);
            return;
        }
        
        const result = await signInWithEmail(email, password);
        if (result.success) {
            showMessage('✅ مرحباً ' + (result.user.displayName || result.user.email));
            document.getElementById('loginPopup').classList.remove('active');
        } else {
            showMessage('❌ ' + result.error, true);
        }
    });
    
    // زر إنشاء حساب
    document.getElementById('createAccountBtn')?.addEventListener('click', async () => {
        const firstName = document.getElementById('signupFirstName').value.trim();
        const lastName = document.getElementById('signupLastName').value.trim();
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const level = document.getElementById('signupLevel').value || 'B1';
        
        if (!firstName || !lastName || !username || !email || !password) {
            showMessage('⚠️ الرجاء ملء جميع الحقول', true);
            return;
        }
        
        if (password.length < 6) {
            showMessage('⚠️ كلمة السر يجب أن تكون 6 أحرف على الأقل', true);
            return;
        }
        
        const result = await createAccount(firstName, lastName, username, email, password, level);
        if (result.success) {
            showMessage('✅ تم إنشاء الحساب بنجاح!');
            document.getElementById('signupPopup').classList.remove('active');
        } else {
            showMessage('❌ ' + result.error, true);
        }
    });
    
    // زر تسجيل الخروج
    document.getElementById('profileLogoutBtn')?.addEventListener('click', signOutUser);
    
    // فتح/إغلاق الـ Profile Dropdown
    document.getElementById('profileIcon')?.addEventListener('click', () => {
        document.getElementById('profileDropdown').classList.toggle('active');
    });
    
    // إغلاق الـ Profile عند النقر خارجها
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
    updateUserData,
    checkPremiumStatus,
    signOutUser,
    updatePremiumFeatures
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
window.updatePremiumFeatures = updatePremiumFeatures;

console.log('✅ Auth System جاهز (مع إنشاء الحساب)');
