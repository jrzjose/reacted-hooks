import { 
  signInWithPopup, 
  signOut, 
  GoogleAuthProvider
} from "firebase/auth";

import { auth } from "../lib/firebase.config";

const provider = new GoogleAuthProvider();

interface FirebaseAuthInterface {
    signIn: () => Promise<any | void>;
    signOut: () => Promise<void>;
    getCurrentUser: () => Promise<any | null>;
}

const FirebaseAuth: FirebaseAuthInterface = {
    signIn: (): Promise<any | void> => {
        return new Promise((resolve) => {
            signInWithPopup(auth, provider)
                .then((response: any) => {
                    resolve(response.user);
                })
                .catch((error: Error) => {
                    console.error(error);
                });
        });
    },
    signOut: (): Promise<void> => {
        return new Promise((resolve) => {
            signOut(auth)
                .then(() => {
                    console.log("user logged out");
                    resolve();
                })
                .catch((error: Error) => {
                    console.error(error);
                    resolve();
                });
        });
    },
    getCurrentUser: (): Promise<any | null> => {
        return new Promise((resolve) => {
            auth.onAuthStateChanged((user: User | null) => {
                resolve(user);
            });
        });
    }
};

export default FirebaseAuth