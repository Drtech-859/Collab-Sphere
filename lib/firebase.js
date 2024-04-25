// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXqui__O_I2DGoJCsUWdVpxgEVpeZa3as",
  authDomain: "collabsphere-cb07d.firebaseapp.com",
  projectId: "collabsphere-cb07d",
  storageBucket: "collabsphere-cb07d.appspot.com",
  messagingSenderId: "975165294345",
  appId: "1:975165294345:web:e4319e90aa1cf4cc3f75d8",
  measurementId: "G-JS3ZY312B8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app}