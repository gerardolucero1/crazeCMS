import firebase from 'firebase/app'

require('firebase/auth')
require('firebase/firestore')
require('firebase/storage')
require('firebase/functions')


var firebaseConfig = {
    apiKey: "AIzaSyCqauZ8ks03Cjwrx6nR_oldJMXtKylASvg",
    authDomain: "craze-85d97.firebaseapp.com",
    databaseURL: "https://craze-85d97.firebaseio.com",
    projectId: "craze-85d97",
    storageBucket: "craze-85d97.appspot.com",
    messagingSenderId: "399502940312",
    appId: "1:399502940312:web:8655f232b9db204a8a18ed",
    measurementId: "G-V0ZLYP6D0N"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

export { firebase, auth, db, storage, functions }