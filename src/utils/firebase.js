// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDUwID_zysHWSRyEbkCHANHNyBXBJRSwpY",
    authDomain: "flixo-39aa5.firebaseapp.com",
    projectId: "flixo-39aa5",
    storageBucket: "flixo-39aa5.firebasestorage.app",
    messagingSenderId: "1062126937534",
    appId: "1:1062126937534:web:d1b03ed8a28bb46f2885ef",
    measurementId: "G-TTQWFQ0TEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();