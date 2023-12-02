import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABiD0nATVqVLknyec7d_laVjNAvcBIIL8",
  authDomain: "torque-c0326.firebaseapp.com",
  projectId: "torque-c0326",
  storageBucket: "torque-c0326.appspot.com",
  messagingSenderId: "351964922129",
  appId: "1:351964922129:web:01f6cc1469e9291b890cb0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// IOS: 351964922129-aaj7t8allpeonrv3u5copigra17s8bvo.apps.googleusercontent.com
// AND: 351964922129-cc2cjhidif7tqmle25kei6ok8nutjodi.apps.googleusercontent.com
