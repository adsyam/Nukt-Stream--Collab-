//this file is mainly for our communication with firebase platform
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// import 'dotenv/config'

const firebaseConfig = {
  //FOR LOCAL
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  //FOR DEPLOYMENT
  //   apiKey: process.env.VITE_FIREBASE_API_KEY,

    apiKey: "AIzaSyBdvKedlvRIdhwlSkzWBPXHsE44pr2aSeY",

  authDomain: "nukt-999af.firebaseapp.com",
  projectId: "nukt-999af",
  storageBucket: "nukt-999af.appspot.com",
  messagingSenderId: "1073047145518",
  appId: "1:1073047145518:web:2c3897b9da335b77a6a3bf",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
