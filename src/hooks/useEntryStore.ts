import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { FirebaseDB } from '../firebase/config';
import { loadNotes } from '../firebase/providers';
import { pickChakraRandomColor } from '../helpers';
import { Entry, EntryStatus } from '../interfaces';
import { RootState } from '../store';
import {
  createEntry,
  deleteEntry,
  setPrevEntries,
  updateEntry,
} from '../store/entries/entrySlice';
import { useAuthStore } from './useAuthStore';

export const useEntryStore = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entries);
  const { uid } = useAuthStore();

  const startLoadingEntry = async () => {
    if (!uid) return;
    const prevEntries: Entry[] = await loadNotes(uid);
    dispatch(setPrevEntries(prevEntries));
  };

  const startCreatingEntry = async (status: EntryStatus) => {
    const initialEntry = {
      id: uuid(),
      status,
      color: pickChakraRandomColor('.400'),
      description: '',
      createdAt: Date.now(),
    };

    try {
      const newDoc = doc(collection(FirebaseDB, `${uid}/todo/entries`));
      await setDoc(newDoc, initialEntry);
      initialEntry.id = newDoc.id;

      dispatch(createEntry(initialEntry));
    } catch (error) {
      console.log(error);
    }
  };

  const startUpdatingStatus = async ({
    id,
    status,
  }: {
    id: string;
    status: EntryStatus;
  }) => {
    dispatch(updateEntry({ id, status }));
  };

  const startUpdatingDescription = async ({ id, description }: Entry) => {
    dispatch(updateEntry({ id, description }));
  };

  const startDeletingEntry = async (id: string) => {
    try {
      dispatch(deleteEntry(id));
      await deleteDoc(doc(FirebaseDB, `${uid}/todo/entries/${id}`));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    entries,
    startCreatingEntry,
    startUpdatingStatus,
    startUpdatingDescription,
    startLoadingEntry,
    startDeletingEntry,
  };
};
