// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR65wQ-AHhxlItPtzfMcaUj8QDhg1_NJw",
  authDomain: "moodflix-login.firebaseapp.com",
  projectId: "moodflix-login",
  storageBucket: "moodflix-login.firebasestorage.app",
  messagingSenderId: "953123405184",
  appId: "1:953123405184:web:3115898ca0264278389565",
  measurementId: "G-TMFX2GQG65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
