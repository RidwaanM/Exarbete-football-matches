
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBzP4FriXbD5nXamH_D-hlBMLRMAXC-U3s",
  authDomain: "exarbete-f0243.firebaseapp.com",
  projectId: "exarbete-f0243",
  storageBucket: "exarbete-f0243.appspot.com", 
  messagingSenderId: "914524475950",
  appId: "1:914524475950:web:64c31cbce6bc2ad10145bf",
  measurementId: "G-T1W2SCDGFF"
};

// Initiera Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Definierar auth här
const provider = new GoogleAuthProvider();

// Funktioner för Google Login och Logout
const signInWithGoogle = () => signInWithPopup(auth, provider);
const logout = () => signOut(auth);

// Exportera auth och funktioner
export { auth, signInWithGoogle, logout };
