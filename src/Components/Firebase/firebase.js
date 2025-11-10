// Import the required Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBg2p1nPZQ39AU91CDzRWeYtQjBs5HHf-Y",
    authDomain: "ajazgraphic-da740.firebaseapp.com",
    projectId: "ajazgraphic-da740",
    storageBucket: "ajazgraphic-da740.appspot.com",
    messagingSenderId: "600209988666",
    appId: "1:600209988666:web:d806f6d7dfd10fa394a903"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
