const firebaseConfig = require("./firebaseConfig.json");
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

// const onAuthStateChanged(auth, (user) => {
//   // Check for user status
// });

const provider = new GoogleAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
};
