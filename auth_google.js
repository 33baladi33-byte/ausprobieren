// ============================================
// auth_google.js - تسجيل الدخول بحساب Google
// ============================================

import { 
    auth, 
    provider, 
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    db,
    doc, 
    getDoc, 
    setDoc,
    serverTimestamp
} from './firebase.js';

// ============================================
// تسجيل الدخول بحساب Google
// ============================================
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // التحقق مما إذا كان المستخدم موجوداً في Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
            // إنشاء مستخدم جديد في Firestore
            const userData = {
                uid: user.uid,
                email: user.email,
                username: user.displayName || user.email?.split('@')[0] || 'مستخدم',
                firstName: user.displayName?.split(' ')[0] || '',
                lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
                plan: 'basic',
                premiumUntil: null,
                createdAt: serverTimestamp()
            };
            
            await setDoc(doc(db, 'users', user.uid), userData);
            console.log('✅ تم إنشاء حساب Google جديد:', user.email);
        }
        
        console.log('✅ تم تسجيل الدخول بحساب Google:', user.email);
        return { success: true, user };
        
    } catch (error) {
        console.error('❌ خطأ في تسجيل الدخول بحساب Google:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// تصدير الدوال
// ============================================
export { signInWithGoogle };

// جعلها متاحة عالمياً
window.signInWithGoogle = signInWithGoogle;

console.log('✅ auth_google.js جاهز');
