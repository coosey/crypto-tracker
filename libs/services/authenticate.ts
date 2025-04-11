import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  User,
} from 'firebase/auth'
import { auth } from "libs/firebase";

export const loginWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export const registerWithEmail = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        sendEmailVerification(userCredentials.user);
      });
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  return await signInWithPopup(auth, provider)
}

export const logout = async () => {
  return await signOut(auth)
}

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}