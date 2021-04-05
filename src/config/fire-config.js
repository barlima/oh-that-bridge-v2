import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBVWwc3w6xKL7wVEXZSdwWxaVFj_3OFDJw",
  authDomain: "oh-that-bridge-v2.firebaseapp.com",
  databaseURL: "YOUR DATABASE URL",
  projectId: "oh-that-bridge-v2",
  storageBucket: "oh-that-bridge-v2.appspot.com",
  messagingSenderId: "93367167432 ",
  appId: "1:93367167432:web:ee9450412f0888f92c78fd",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const fire = firebase;

export default fire;
