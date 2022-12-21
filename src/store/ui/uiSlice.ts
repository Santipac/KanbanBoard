import { createSlice } from '@reduxjs/toolkit';

interface UIDrag {
  isDragging: boolean;
}

const initialState: UIDrag = {
  isDragging: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startDragging: state => {
      state.isDragging = true;
    },
    endDragging: state => {
      state.isDragging = false;
    },
  },
});

export const { startDragging, endDragging } = uiSlice.actions;

export default uiSlice.reducer;
