import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABiD0nATVqVLknyec7d_laVjNAvcBIIL8",
  authDomain: "torque-c0326.firebaseapp.com",
  projectId: "torque-c0326",
  storageBucket: "torque-c0326.appspot.com",
  messagingSenderId: "351964922129",
  appId: "1:351964922129:web:01f6cc1469e9291b890cb0",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export const usersRef = collection(db, "users");

export { db, storage, auth };
