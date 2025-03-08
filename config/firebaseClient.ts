// src/config/firebaseClient.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/* const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId:process.env.PROJECT_ID,
  storageBucket:process.env.STORAGE_BUCKET_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
*/
const firebaseConfig = {
  apiKey: "AIzaSyDGCE_Rh-In1hO3VEbv9JVewUdEdk7WMJM",
  authDomain: "assignment-116bc.firebaseapp.com",
  projectId: "assignment-116bc",
  storageBucket: "assignment-116bc.firebasestorage.app",
  messagingSenderId: "1072507337029",
  appId: "1:1072507337029:web:e8f46014e35e8c881a662c",
  measurementId: "G-FRZY1JK3W7"
};


const app = initializeApp(firebaseConfig);
const clientAuth = getAuth(app);

export { clientAuth };