// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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