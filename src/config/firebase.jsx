//this file is mainly for our communication with firebase platform
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
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