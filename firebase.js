// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIJh0h0Y2ggkAoHamxmVZcwKV_zosnCJw",
  authDomain: "inventory-management-88273.firebaseapp.com",
  projectId: "inventory-management-88273",
  storageBucket: "inventory-management-88273.appspot.com",
  messagingSenderId: "82561579735",
  appId: "1:82561579735:web:052198ffdbf753403c4e92",
  measurementId: "G-0ZX1ZH56SZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export {firestore}


