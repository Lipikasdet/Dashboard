import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCdmsodLvRHk8H25-PqUVrftgVM9lLXS34",
  authDomain: "kpid-31ea0.firebaseapp.com",
  projectId: "kpid-31ea0",
  storageBucket: "kpid-31ea0.appspot.com",
  messagingSenderId: "314429389072",
  appId: "1:314429389072:web:d3134ba24ff816d5514d95",
  measurementId: "G-S8DVRNV71K"
};

export let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firestore = getFirestore(firebase_app)
const auth = getAuth(firebase_app);
export { auth, firestore}