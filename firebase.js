import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = require("./firebaseConfig.json");

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// onAuthStateChanged(auth, (user) => {
//   // Check for user status
// });

// const provider = new GoogleAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // provider,
  signInWithPopup,
  GoogleAuthProvider,
};
