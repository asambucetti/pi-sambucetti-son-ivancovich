import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB2-98232rOW_HWCzvA0tmNQwxQoCMC4xo",
  authDomain: "pi-sambucetti-son-ivancovich.firebaseapp.com",
  projectId: "pi-sambucetti-son-ivancovich",
  storageBucket: "pi-sambucetti-son-ivancovich.firebasestorage.app",
  messagingSenderId: "413621777478",
  appId: "1:413621777478:web:d09ae09c551113632e4647"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();