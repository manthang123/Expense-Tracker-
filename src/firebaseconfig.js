// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE3_rS4Ssj2TGqXgtvSE3p6jSm5r0cfm8",
  authDomain: "hackthon-4a8db.firebaseapp.com",
  projectId: "hackthon-4a8db",
  storageBucket: "hackthon-4a8db.appspot.com",
  messagingSenderId: "328750275507",
  appId: "1:328750275507:web:3a903ee15bc302f53509c6",
  measurementId: "G-H482YG6PDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, analytics, firestore };
