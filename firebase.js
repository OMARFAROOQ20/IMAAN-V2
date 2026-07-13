import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
getAuth,
GoogleAuthProvider,
signInWithPopup,
RecaptchaVerifier,
signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyA_SwUkzcrEFMjk8SU0oyMN73Nps04K3wU",
authDomain: "imaan-v2.firebaseapp.com",
projectId: "imaan-v2",
storageBucket: "imaan-v2.firebasestorage.app",
messagingSenderId: "210488669851",
appId: "1:210488669851:web:55eb7dad8f8cee68ba383e",
measurementId: "G-3LT5J05X6S"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

window.auth = auth;
window.provider = provider;
window.signInWithPopup = signInWithPopup;
window.RecaptchaVerifier = RecaptchaVerifier;
window.signInWithPhoneNumber = signInWithPhoneNumber;