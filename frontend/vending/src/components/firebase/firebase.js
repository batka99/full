import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyChdS58SaxVp_1A_gR7eYqoMtuGcpuRMIo",
  authDomain: "machine-779b9.firebaseapp.com",
  databaseURL: "https://machine-779b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "machine-779b9",
  storageBucket: "machine-779b9.appspot.com",
  messagingSenderId: "488787210639",
  appId: "1:488787210639:web:1d41f9dc63bb6f5cc91bfa",
  measurementId: "G-ENY2SS19SX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


