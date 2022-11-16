// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-Y8mZrppWjTtV2Eep1lbeZZ_EzNOvQNs",
  authDomain: "app-01-streaming.firebaseapp.com",
  projectId: "app-01-streaming",
  storageBucket: "app-01-streaming.appspot.com",
  messagingSenderId: "81649410484",
  appId: "1:81649410484:web:f86d5412cb51898a4852e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);