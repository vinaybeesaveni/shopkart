// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLq6K-rZaSmR_cl7ogZRZWI8mft2ZfQsE",
  authDomain: "ahexkart.firebaseapp.com",
  projectId: "ahexkart",
  storageBucket: "ahexkart.appspot.com",
  messagingSenderId: "688861333147",
  appId: "1:688861333147:web:5896d7605c78f17ff2683e",
  measurementId: "G-41PR1B5Y92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // gets the detils of currently authenticated user

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
