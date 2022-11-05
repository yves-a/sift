import * as firebase from "firebase";

const firebaseConfig = require("./firebaseConfig.json");

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// export default app
const auth = firebase.auth();

export { auth };
