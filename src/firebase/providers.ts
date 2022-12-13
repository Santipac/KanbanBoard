import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { IRegister } from '../types/models';
import { FirebaseAuth } from './config';

export const registerWithEmailPassword = async ({
  displayName,
  email,
  password,
}: IRegister) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    if (FirebaseAuth.currentUser === null) return;
    await updateProfile(FirebaseAuth.currentUser, { displayName });
    const { photoURL, uid } = resp.user;
    return {
      ok: true,
      photoURL,
      uid,
      email,
      displayName,
    };
  } catch (error) {
    return { ok: false, errorMessage: error };
  }
};
