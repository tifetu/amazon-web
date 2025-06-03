// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy9_OChUzpsktQg2DsjFaK0VXFDtOL8vI",
  authDomain: "clone-74e14.firebaseapp.com",
  projectId: "clone-74e14",
  storageBucket: "clone-74e14.appspot.com",
  messagingSenderId: "104632006644",
  appId: "1:104632006644:web:2f96bceb927dfe1fc5eba1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);

export { auth, db };
