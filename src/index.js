import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';

import * as serviceWorker from './serviceWorker';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
    apiKey: "AIzaSyDcv40AZwEIt7rcOeUk6kxU_mNnbIzE_J4",
    authDomain: "cooking-forum.firebaseapp.com",
    databaseURL: "https://cooking-forum-default-rtdb.firebaseio.com",
    projectId: "cooking-forum",
    storageBucket: "cooking-forum.appspot.com",
    messagingSenderId: "188904882071",
    appId: "1:188904882071:web:1bf4e9bcd70a07c0d00ed2",
    measurementId: "G-M344EL3XNC"
};

firebase.initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
    firebase.auth().useEmulator('http://localhost:9099');
    firebase.database().useEmulator("localhost", 9000);
    firebase.functions.useEmulator('localhost', 5001)
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
