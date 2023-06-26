import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1doKkIxUVR0AbKD2ow7f4SARSB4GXS64",
  authDomain: "isort-1bc55.firebaseapp.com",
  projectId: "isort-1bc55",
  storageBucket: "isort-1bc55.appspot.com",
  messagingSenderId: "322330242290",
  appId: "1:322330242290:web:88290376f2be58c42cf46b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
