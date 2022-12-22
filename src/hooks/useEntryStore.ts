import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { pickChakraRandomColor } from '../helpers';
import { Entry, EntryStatus } from '../interfaces';
import { RootState } from '../store';
import { createEntry, updateEntry } from '../store/entries/entrySlice';

export const useEntryStore = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entries);

  const startCreatingTasks = async (status: EntryStatus) => {
    dispatch(
      createEntry({
        _id: uuid(),
        status,
        color: pickChakraRandomColor('.400'),
        description: '',
        createdAt: Date.now(),
      })
    );
  };

  const startUpdatingStatus = async ({
    _id,
    status,
  }: {
    _id: string;
    status: EntryStatus;
  }) => {
    dispatch(updateEntry({ _id, status }));
  };
  const startUpdatingDescription = async ({ _id, description }: Entry) => {
    dispatch(updateEntry({ _id, description }));
  };

  return {
    entries,
    startCreatingTasks,
    startUpdatingStatus,
    startUpdatingDescription,
  };
};
