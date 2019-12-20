import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyA9cizAaMnxxbN_ctJc5iJuRY5wn_an_SA",
    authDomain: "jlungu-final-project.firebaseapp.com",
    databaseURL: "https://jlungu-final-project.firebaseio.com",
    projectId: "jlungu-final-project",
    storageBucket: "jlungu-final-project.appspot.com",
    messagingSenderId: "450126961273",
    appId: "1:450126961273:web:d95d73d827fd711e65d2a8",
    measurementId: "G-GKMPYVZHHY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;