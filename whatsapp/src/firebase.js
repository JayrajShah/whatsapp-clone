import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDNqUkLNaxEueUrfdT7W5-s79-qkV6Sh8M",
  authDomain: "whatsapp-clone-63836.firebaseapp.com",
  projectId: "whatsapp-clone-63836",
  storageBucket: "whatsapp-clone-63836.appspot.com",
  messagingSenderId: "1063440989043",
  appId: "1:1063440989043:web:348afefcbe8b8a01da2306",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
