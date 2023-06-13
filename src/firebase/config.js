import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD33M-EN2HU2tTXR_2vrGsMhGgs1yS-KlE",
  authDomain: "saharaviewpoint-8eda3.firebaseapp.com",
  projectId: "saharaviewpoint-8eda3",
  storageBucket: "saharaviewpoint-8eda3.appspot.com",
  messagingSenderId: "946310710861",
  appId: "1:946310710861:web:a199d71dde8ea7374abe04",
  measurementId: "G-ZYJ0G6ELQZ",
};

initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore();
// const auth = getAuth()
// const provider = new GoogleAuthProvider();

export { db, storage };
