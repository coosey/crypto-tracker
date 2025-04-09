import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateCurrentUser,
  User
} from 'firebase/auth'
import { auth } from '../firebase';
import { firebaseErrorHandler } from 'libs/firebase/errors';

export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
    updateCurrentUser(auth, userCredentials.user);
  }).catch((error) => {
    const errorCode = error.code;
    alert(firebaseErrorHandler(errorCode));
    console.log('Error code: ', errorCode);
  });
}

export const registerWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredentials) => {
      updateCurrentUser(auth, userCredentials.user);
      sendEmailVerification(userCredentials.user);
      console.log('Email verification sent');
    }).catch((error) => {
      const errorCode = error.code;
      firebaseErrorHandler(errorCode);
      console.error('Error: ', error);
    })
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