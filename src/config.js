import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth" ;

const firebaseConfig = {
  apiKey: "AIzaSyBvtcSL-hHN1S7Lqt8NBOxoQqlRTF7gVbM",
  authDomain: "fir-1-969e7.firebaseapp.com",
  projectId: "fir-1-969e7",
  storageBucket: "fir-1-969e7.appspot.com",
  messagingSenderId: "649310536931",
  appId: "1:649310536931:web:8497b2573c562fdd5971d6",
  measurementId: "G-1352M4TGDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider =  new GoogleAuthProvider();
export {auth , provider};