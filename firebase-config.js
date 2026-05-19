// ============================================
// firebase-config.js - إعدادات Firebase
// ============================================

const firebaseConfig = {
    apiKey: "AIzaSyCZq2ZHV1QJF8T_hk6qrBmlAdn4GU0LNzw",
    authDomain: "zertiva-b2.firebaseapp.com",
    projectId: "zertiva-b2",
    storageBucket: "zertiva-b2.firebasestorage.app",
    messagingSenderId: "621685273758",
    appId: "1:621685273758:web:3d75c275448b732e66b78f",
    measurementId: "G-YKE5C63DB8",
    databaseURL: "https://zertiva-b2-default-rtdb.europe-west1.firebasedatabase.app"
};

// تهيئة Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase initialized successfully");
    console.log("📁 Database URL:", firebaseConfig.databaseURL);
}

// الحصول على مرجع قاعدة البيانات
const database = firebase.database();

// جعل الدوال متاحة عالمياً
window.db = database;
window.firebaseInitialized = true;
