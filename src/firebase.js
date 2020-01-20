import firebase from 'firebase/app'

require('firebase/auth')
require('firebase/firestore')
require('firebase/storage')
require('firebase/functions')


var firebaseConfig = {
    // apiKey: "AIzaSyCqauZ8ks03Cjwrx6nR_oldJMXtKylASvg",
    // authDomain: "craze-85d97.firebaseapp.com",
    // databaseURL: "https://craze-85d97.firebaseio.com",
    // projectId: "craze-85d97",
    // storageBucket: "craze-85d97.appspot.com",
    // messagingSenderId: "399502940312",
    // appId: "1:399502940312:web:8655f232b9db204a8a18ed",
    // measurementId: "G-V0ZLYP6D0N"
    apiKey: "AIzaSyB-Y8DHYC5ki4EKBojAfalAGYFPCuHaAFU",
    authDomain: "craze-71d6b.firebaseapp.com",
    databaseURL: "https://craze-71d6b.firebaseio.com",
    projectId: "craze-71d6b",
    storageBucket: "craze-71d6b.appspot.com",
    messagingSenderId: "999017124538",
    appId: "1:999017124538:web:524a9bb2cad04380d72883",
    measurementId: "G-TCL8FH6GTW"
};

let defaultApp = firebase.initializeApp(firebaseConfig)
let secondApp = firebase.initializeApp(firebaseConfig, "second")

const auth = defaultApp.auth()
const db = defaultApp.firestore()
const storage = defaultApp.storage()
const functions = defaultApp.functions()
const secondAuth = secondApp.auth()

export { firebase, auth, db, storage, functions, secondAuth }
