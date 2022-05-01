// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIQvUcf6qEG3uN8N8cQZ4XGVmJbhHkw6k",
  authDomain: "daksha-admin.firebaseapp.com",
  projectId: "daksha-admin",
  storageBucket: "daksha-admin.appspot.com",
  messagingSenderId: "245494564655",
  appId: "1:245494564655:web:52aacaec384220039b03da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {app,db,auth}
