import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry, EntryStatus } from '../../interfaces';
import { v4 as uuid } from 'uuid';
const initialState: Entry[] = [];

const entrySlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    createEntry: (state, { payload }: PayloadAction<Entry>) => {
      state.push(payload);
    },
    deleteEntry: (state, { payload }: PayloadAction<string>) => {
      const entryFound = state.find(entry => entry._id === payload);
      if (entryFound) {
        state.splice(state.indexOf(entryFound), 1);
      }
    },
    updateEntry: (
      state,
      {
        payload,
      }: PayloadAction<{
        _id: string;
        status?: EntryStatus;
        description?: string;
      }>
    ) => {
      const entryFound = state.find(entry => entry._id === payload._id);
      if (entryFound) {
        entryFound.status = payload.status ?? entryFound.status;
        entryFound.description = payload.description ?? entryFound.description;
      }
    },
  },
});

export const { createEntry, deleteEntry, updateEntry } = entrySlice.actions;

export default entrySlice.reducer;
