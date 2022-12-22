import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Entry } from '../interfaces';
import { IRegister } from '../types/models';
import { FirebaseAuth, FirebaseDB } from './config';

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

export const loadNotes = async (uid: string) => {
  const collectionRef = collection(FirebaseDB, `${uid}/todo/entries`);
  const { docs } = await getDocs(collectionRef);
  const entries = docs.map(doc => doc.data() as Entry);

  return entries;
};
