import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCSkjYyWdjrSN5UygNRV46I7o9QpLGKPdM",
  authDomain: "shoutouts-73436.firebaseapp.com",
  projectId: "shoutouts-73436",
  storageBucket: "shoutouts-73436.appspot.com",
  messagingSenderId: "220796212623",
  appId: "1:220796212623:web:08bbb18ff8271e2d4c27fa",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}

export const storage = getStorage(app);

//after doing this we need to set up context because that is the best way to pass that info around.
