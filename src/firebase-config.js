import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKUK3kbAMra4egKh9CjgAPhV9asOKMaRY",
  authDomain: "my-react-project-8742b.firebaseapp.com",
  projectId: "my-react-project-8742b",
  storageBucket: "my-react-project-8742b.appspot.com",
  messagingSenderId: "701266683411",
  appId: "1:701266683411:web:4fdd519d7f5f7505d881e6",
  measurementId: "G-ERLRMY2LLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const store = app.firestore()

export { store }