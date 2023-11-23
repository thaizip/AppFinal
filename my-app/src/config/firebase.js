// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// retirar não vamos utilizar
// import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjuW92XJK44TJ_mDs5D44e_CPd8s81j1A",
  authDomain: "mobilefinal-5e86b.firebaseapp.com",
  projectId: "mobilefinal-5e86b",
  storageBucket: "mobilefinal-5e86b.appspot.com",
  messagingSenderId: "224510939116",
  appId: "1:224510939116:web:0d8aea35d88b80017efac9",
  measurementId: "G-WNB5MKV34F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// retirn não vamos utilizar
// const analytics = getAnalytics(app);

const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })

export { auth } ;