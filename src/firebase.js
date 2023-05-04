// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZtF1nJf9EH2brikO4frxuhOlv-hjwkmw",
  authDomain: "capstone-project-27cf0.firebaseapp.com",
  projectId: "capstone-project-27cf0",
  storageBucket: "capstone-project-27cf0.appspot.com",
  messagingSenderId: "925439235520",
  appId: "1:925439235520:web:7aca7b015e3ae3dab3e425",
  measurementId: "G-4BH84BZRME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);