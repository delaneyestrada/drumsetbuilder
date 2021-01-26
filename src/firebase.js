import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const fb = firebase;

// collection references
const usersCollection = db.collection("users");

// export utils/refs
export { db, auth, usersCollection, fb };
