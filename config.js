import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyCzwO7oMHN4KMpWIDU0FUUZu7OCEjb7ekI",
  authDomain: "wanted-24a64.firebaseapp.com",
  databaseURL: "https://wanted-24a64.firebaseio.com",
  projectId: "wanted-24a64",
  storageBucket: "wanted-24a64.appspot.com",
  messagingSenderId: "56215061520",
  appId: "1:56215061520:web:55cbfbd79eb8bce21d7695",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();
