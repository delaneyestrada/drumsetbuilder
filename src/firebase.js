// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "***REMOVED***",
//     authDomain: "drum-set-builder.firebaseapp.com",
//     databaseURL: "https://drum-set-builder.firebaseio.com",
//     projectId: "drum-set-builder",
//     storageBucket: "drum-set-builder.appspot.com",
//     messagingSenderId: "299035189486",
//     appId: "1:299035189486:web:e55912f68ca311a45453ff",
//     measurementId: "G-T3WB5VZBCN"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>
import firebase from "firebase"

const firebaseConfig = {
    apiKey: '***REMOVED***',
    authDomain: 'drum-set-builder.firebaseapp.com',
    databaseURL: 'https://drum-set-builder.firebaseio.com',
    projectId: 'drum-set-builder',
    storageBucket: 'drum-set-builder.appspot.com',
    messagingSenderId: '299035189486',
    appId: '1:299035189486:web:e55912f68ca311a45453ff'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const fb = firebase

// collection references
const usersCollection = db.collection('users')

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    fb
}