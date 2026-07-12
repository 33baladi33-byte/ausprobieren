// ============================================
// firebase.js - إعدادات Firebase الكاملة
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyAzoGoi_lPaN3ni83Ej5YbK4mPI4XTVJ0k",
  authDomain: "zertiva-b2-b659d.firebaseapp.com",
  projectId: "Zertiva-B2-B659D",
  storageBucket: "zertiva-b2-b659d.firebasestorage.app",
  messagingSenderId: "649511433428",
  appId: "1:649511433428:web:8cb47b18aafa49184a7741"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    deleteDoc,
    serverTimestamp,
    collection,
    query,
    where,
    getDocs,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ✅ تعيين استمرارية الجلسة (لتبقى مسجلاً بعد Refresh)
await setPersistence(auth, browserLocalPersistence);

export { 
    app, auth, db, provider,
    signInWithPopup, signOut, onAuthStateChanged, setPersistence,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    updateProfile, sendPasswordResetEmail, sendEmailVerification,
    doc, getDoc, setDoc, updateDoc, deleteDoc, serverTimestamp,
    collection, query, where, getDocs, onSnapshot
};

// جعلها متاحة عالمياً للاختبار
window.auth = auth;
window.db = db;

console.log('✅ Firebase initialized with persistence');
