import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore/lite';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { FirebaseDB } from '../firebase/config';
import { loadNotes } from '../firebase/providers';
import { pickChakraRandomColor } from '../helpers';
import { Entry, EntryStatus } from '../interfaces';
import { RootState } from '../store';
import {
  clearEntries,
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
    try {
      const newDoc = doc(collection(FirebaseDB, `${uid}/todo/entries`));

      const initialEntry = {
        id: newDoc.id,
        status,
        color: pickChakraRandomColor('.400'),
        description: '',
        createdAt: Date.now(),
      };
      await setDoc(newDoc, initialEntry);
      dispatch(createEntry(initialEntry));
    } catch (error) {
      toast.error('No se pudieron aplicar los cambios.');
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
    try {
      const entryRef = doc(FirebaseDB, `${uid}/todo/entries/${id}`);
      await updateDoc(entryRef, {
        status,
      });
      toast.success('Cambios guardados');
      dispatch(updateEntry({ id, status }));
    } catch (error) {
      toast.error('No se pudieron aplicar los cambios.');
    }
  };

  const startUpdatingDescription = async ({
    id,
    description,
  }: {
    id: string;
    description: string;
  }) => {
    try {
      const entryRef = doc(FirebaseDB, `${uid}/todo/entries/${id}`);
      await updateDoc(entryRef, {
        description,
      });
      toast.success('Tarjeta Actualizada correctamente!');

      dispatch(updateEntry({ id, description }));
    } catch (error) {
      console.log(error);
      toast.error('No se pudieron aplicar los cambios.');
    }
  };

  const startDeletingEntry = async (id: string) => {
    try {
      dispatch(deleteEntry(id));
      await deleteDoc(doc(FirebaseDB, `${uid}/todo/entries/${id}`));
      toast.success('Tarjeta eliminada correctamente!');
    } catch (error) {
      console.log(error);
      toast.error('No se pudo eliminar la tarjeta.');
    }
  };
  const startCleanEntries = () => {
    dispatch(clearEntries());
  };
  return {
    entries,
    startCreatingEntry,
    startUpdatingStatus,
    startUpdatingDescription,
    startLoadingEntry,
    startDeletingEntry,
    startCleanEntries,
  };
};
