import firebase from 'firebase/compat/app'; // Use the compatibility version
import 'firebase/compat/auth'; // Import the necessary module explicitly
import 'firebase/compat/firestore'; // Import the necessary module explicitly
import 'firebase/compat/storage'; // Import the necessary module explicitly

const firebaseConfig = {
    apiKey: "AIzaSyDNOL1BlMLBk_3TRLTXuOxGgafzdde96Qs",
    authDomain: "next-bb766.firebaseapp.com",
    projectId: "next-bb766",
    storageBucket: "next-bb766.appspot.com",
    messagingSenderId: "751032480443",
    appId: "1:751032480443:web:a8ce103a76b22d0096af9e",
    measurementId: "G-H5R6RDK8X7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
