import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCMrVi82mk9UgtjLjfK26m-g8K-4_BeU0",
    authDomain: "linksapp-1063e.firebaseapp.com",
    databaseURL: "https://linksapp-1063e.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "276377206049"
};

firebase.initializeApp(config);

export default firebase;