// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-Y8mZrppWjTtV2Eep1lbeZZ_EzNOvQNs',
  authDomain: 'app-01-streaming.firebaseapp.com',
  projectId: 'app-01-streaming',
  storageBucket: 'app-01-streaming.appspot.com',
  messagingSenderId: '81649410484',
  appId: '1:81649410484:web:f86d5412cb51898a4852e1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const database = getFirestore(app);

export { app, auth, database };
