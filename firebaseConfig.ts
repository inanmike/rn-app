// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlRrH7P4WqzEcmPQyaNaDPBvsMg5LBtN4",
  authDomain: "rn-movie-8d911.firebaseapp.com",
  projectId: "rn-movie-8d911",
  storageBucket: "rn-movie-8d911.firebasestorage.app",
  messagingSenderId: "902322431611",
  appId: "1:902322431611:web:da2a66782ff86b8f5c24de",
  measurementId: "G-3GLB4E7X5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app)
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {auth, firestore, db}