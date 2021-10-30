import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzc-03WalAfCyuUfcPzk6FqzO-jZ4LHn4",
  authDomain: "vue-firebase-auth-1a94a.firebaseapp.com",
  projectId: "vue-firebase-auth-1a94a",
  storageBucket: "vue-firebase-auth-1a94a.appspot.com",
  messagingSenderId: "862799594750",
  appId: "1:862799594750:web:276106ed5f206d2afc91af",
  measurementId: "G-FYEBYZRYJ5"
};

// Init firebase
firebase.initializeApp(firebaseConfig)

// Init firestore service
const firestoreService = firebase.firestore()

// Init firebase auth service
const firebaseAuth = firebase.auth()

// Init firebase storage service
const firebaseStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { firestoreService, firebaseAuth, firebaseStorage, timestamp }