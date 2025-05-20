// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOcUvCHAU3lTl7N3jhAgk8p1tyAwxkibY",
  authDomain: "roommate-finder-fe424.firebaseapp.com",
  projectId: "roommate-finder-fe424",
  storageBucket: "roommate-finder-fe424.firebasestorage.app",
  messagingSenderId: "182278222548",
  appId: "1:182278222548:web:6d5498e0001db408b54141"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);