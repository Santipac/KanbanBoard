import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry, EntryStatus } from '../../types/models';

const initialState: Entry[] = [];

const entrySlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    setPrevEntries: (state, { payload }: PayloadAction<Entry[]>) => {
      payload.map(el => state.push(el));
    },
    createEntry: (state, { payload }: PayloadAction<Entry>) => {
      const entryExist = state.find(entry => entry.id === payload.id);
      if (entryExist) return;
      state.push(payload);
    },

    updateEntry: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        status?: EntryStatus;
        description?: string;
      }>
    ) => {
      const entryFound = state.find(entry => entry.id === payload.id);
      if (entryFound) {
        entryFound.status = payload.status ?? entryFound.status;
        entryFound.description = payload.description ?? entryFound.description;
      }
    },
    deleteEntry: (state, { payload }: PayloadAction<string>) => {
      const entryFound = state.find(entry => entry.id === payload);
      if (entryFound) {
        state.splice(state.indexOf(entryFound), 1);
      }
    },
    clearEntries: state => {
      state.length = 0;
    },
  },
});

export const {
  createEntry,
  deleteEntry,
  updateEntry,
  setPrevEntries,
  clearEntries,
} = entrySlice.actions;

export default entrySlice.reducer;
