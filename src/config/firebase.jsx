//this file is mainly for our communication with firebase platform
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import 'dotenv/config'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // apiKey: "AIzaSyAohv9knB9w4jrP5O0NloPk5TXVSEN6pqQ",
  // authDomain: "nukt-auth.firebaseapp.com",
  // databaseURL:
  //   "https://nukt-auth-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "nukt-auth",
  // storageBucket: "nukt-auth.appspot.com",
  // messagingSenderId: "751279116758",
  // appId: "1:751279116758:web:8cb5a2ab32f6b44fc05477",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
export const fileDB = getStorage(app);
export const textDB = getFirestore(app);
