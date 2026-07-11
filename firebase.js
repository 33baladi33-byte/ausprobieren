// ============================================
// firebase.js - إعدادات Firebase الكاملة
// ============================================

// 🔑 بيانات Firebase (انسخها من موقع Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyAzoGoi_lPaN3ni83Ej5YbK4mPI4XTVJ0k",
  authDomain: "zertiva-b2-b659d.firebaseapp.com",
  projectId: "Zertiva-B2-B659D",
  storageBucket: "zertiva-b2-b659d.firebasestorage.app",
  messagingSenderId: "649511433428",
  appId: "1:649511433428:web:8cb47b18aafa49184a7741"
};

// ============================================
// استيراد Firebase SDK
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    onSnapshot,
    serverTimestamp,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// ============================================
// تهيئة Firebase
// ============================================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ============================================
// دوال إضافية لإنشاء الحساب بالبريد وكلمة المرور
// ============================================
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// ============================================
// تصدير للاستخدام في ملفات أخرى
// ============================================
export { 
    app, 
    auth, 
    db, 
    provider,
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp,
    collection, query, where, getDocs,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    sendPasswordResetEmail
};

// ============================================
// جعلها متاحة عالمياً (للوصول من console)
// ============================================
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;
window.firebaseSignOut = signOut;
window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.sendPasswordResetEmail = sendPasswordResetEmail;

console.log('✅ Firebase تم تهيئته بنجاح مع جميع الدوال');
