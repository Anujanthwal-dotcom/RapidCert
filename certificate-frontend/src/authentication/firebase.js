// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "your api key",
    authDomain: "auth Domain",
    projectId: "project id",
    storageBucket: "storage Bucket",
    messagingSenderId: "sender id",
    appId: "app id",
    measurementId: "id"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
