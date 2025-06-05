// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRIb5qQ7b-ig_vkIJFs8w2eDNf6QdfQnw",
  authDomain: "product-recommendation-byratul.firebaseapp.com",
  projectId: "product-recommendation-byratul",
  storageBucket: "product-recommendation-byratul.firebasestorage.app",
  messagingSenderId: "704958507888",
  appId: "1:704958507888:web:fd3c10742913b3755cfdb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);