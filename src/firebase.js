import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCOv8nLJ5nApnJfd9bapEugCNX7ZrjjkUA",
    authDomain: "whatsapp-clone-81687.firebaseapp.com",
    projectId: "whatsapp-clone-81687",
    storageBucket: "whatsapp-clone-81687.appspot.com",
    messagingSenderId: "546928277165",
    appId: "1:546928277165:web:5b0bb07f83d5aa910cf824",
    measurementId: "G-Z022JR6BD4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;