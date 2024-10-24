// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-dashboard-9818a.firebaseapp.com",
  projectId: "react-dashboard-9818a",
  storageBucket: "react-dashboard-9818a.appspot.com",
  messagingSenderId: "264035113923",
  appId: "1:264035113923:web:af170c344420135abe7b76",
  measurementId: "G-PE3H9R5WY0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
