import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8oL4xTKPP-ULaWD9fjZgKJoH8cHWK2Xk",
  authDomain: "keep-inventory.firebaseapp.com",
  projectId: "keep-inventory",
  storageBucket: "keep-inventory.appspot.com",
  messagingSenderId: "60277865116",
  appId: "1:60277865116:web:90b5de69fd2bb65a224b59",
  measurementId: "G-VFEJL12QFE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
