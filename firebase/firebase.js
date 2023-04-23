// Import the functions you need from the SDKs you need
import { FIREBASE_API_KEY } from '@env';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "photobud.firebaseapp.com",
  projectId: "photobud",
  storageBucket: "photobud.appspot.com",
  messagingSenderId: "28681445353",
  appId: "1:28681445353:web:b2e679237002470477b578",
  measurementId: "G-VJLR6VEEW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});
