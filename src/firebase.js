
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import {signOut, GoogleAuthProvider, getAuth , signInWithPopup} from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_KEY,
  authDomain: "books-4a583.firebaseapp.com",
  projectId: "books-4a583",
  storageBucket: "books-4a583.appspot.com",
  messagingSenderId: "815727597310",
  appId: "1:815727597310:web:4601776383fd32c0d137af",
  measurementId: "G-P635021Z58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);


const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    const name = result.user.displayName;
    const email = result.user.email;
    

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);


    

  })
  .catch((error) => {
    console.log(error);
  });
};

export const handleSignOut = () => {
  signOut(auth).then(() => {
    


}).catch((error) => {
  // An error happened.
});
}


