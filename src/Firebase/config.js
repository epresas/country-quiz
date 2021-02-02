//1. import the dependencies
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import 'firebase/auth';

//2. Initialize app with the config vars
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCYfxusOfNU_Ph2NdW8snuNAx4RoaPbtdI",
    authDomain: "ep-country-quiz.firebaseapp.com",
    databaseURL: "https://ep-country-quiz-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ep-country-quiz",
    storageBucket: "ep-country-quiz.appspot.com",
    messagingSenderId: "165533925748",
    appId: "1:165533925748:web:a109415920635d7479ec21"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

//3. export it for use
export default app;