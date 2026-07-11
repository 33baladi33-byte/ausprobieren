import { initializeApp } from
"https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
 getAuth,
 GoogleAuthProvider,
 signInWithPopup,
 signOut,
 onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
 getFirestore
}
from
"https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
