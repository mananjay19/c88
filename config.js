import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAV1M6TaoIk2T-1DIpOMpQRQjpFu5kFxrA",
    authDomain: "book-santa-224ea.firebaseapp.com",
    projectId: "book-santa-224ea",
    storageBucket: "book-santa-224ea.appspot.com",
    messagingSenderId: "425133117670",
    appId: "1:425133117670:web:269bcf6b48d0ea71d8ab27"
  };

if (!firebase.app.length){
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();
