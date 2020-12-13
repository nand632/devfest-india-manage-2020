import firebase from 'firebase/app';
import 'firebase/auth';   
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/functions';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHLgAg8omFtnUfTRdPafYyN_AF_1glF3o",
  authDomain: "devfestindia-15728.firebaseapp.com",
  projectId: "devfestindia-15728",
  storageBucket: "devfestindia-15728.appspot.com",
  messagingSenderId: "783040005621",
  appId: "1:783040005621:web:75f33f12ddcad404ff8cbc",
  measurementId: "G-HTXGSJ6ZC4"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence({synchronizeTabs:!0}).catch(()=>{console.warn("DB offline support not available")})
export default{
  firestore:firebase.firestore(),
  auth:firebase.auth(),
  authw:firebase.auth,
  functions: firebase.functions(),
  firebase:firebase
};