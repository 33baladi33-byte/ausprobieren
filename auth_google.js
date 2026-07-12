import { auth, provider, signInWithPopup, db, doc, getDoc, setDoc, serverTimestamp } from './firebase.js';

async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                username: user.displayName || user.email?.split('@')[0] || 'مستخدم',
                firstName: user.displayName?.split(' ')[0] || '',
                lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
                premium: false,
                premiumUntil: null,
                activeSession: '',
                createdAt: serverTimestamp()
            });
        }
        return { success: true, user };
    } catch (error) {
        console.error('Google sign-in error:', error);
        return { success: false, error: error.message };
    }
}
export { signInWithGoogle };
window.signInWithGoogle = signInWithGoogle;
