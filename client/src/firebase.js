// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9f5d4.firebaseapp.com",
  projectId: "mern-estate-9f5d4",
  storageBucket: "mern-estate-9f5d4.firebasestorage.app",
  messagingSenderId: "527081576170",
  appId: "1:527081576170:web:a02cd3a79d1d2cf773e993"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);