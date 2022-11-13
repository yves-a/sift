const firebaseConfig = require('./firebaseConfig.json')
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseApp = initializeApp(firebaseConfig)
// let app
// if (firebase.apps.length === 0) {
//   app = initializeApp(firebaseConfig)
// } else {
//   app = firebase.app()
// }

// export default app
const auth = getAuth(firebaseApp)
onAuthStateChanged(auth, (user) => {
  // Check for user status
})

const provider = new GoogleAuthProvider()
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
}
