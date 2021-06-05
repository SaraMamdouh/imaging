import firebase from "firebase";


 const firebaseConfig = {
    apiKey: "AIzaSyAdRza8CzRyhhitT_FvbFjJFNqLb3l2uZI",
    authDomain: "imaging-f8b3c.firebaseapp.com",
    databaseURL: "https://imaging-f8b3c-default-rtdb.firebaseio.com",
    projectId: "imaging-f8b3c",
    storageBucket: "imaging-f8b3c.appspot.com",
    messagingSenderId: "436895257037",
    appId: "1:436895257037:web:f71b5711e66c1c5e8f7484",
    measurementId: "G-DMXVDBWQ21"
  };

  firebase.initializeApp(firebaseConfig);
  export const db = firebase.database();
      


