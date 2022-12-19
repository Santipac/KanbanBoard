import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskModel } from '../../types/models';
const initialState: TaskModel[] = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: (state, { payload }: PayloadAction<TaskModel>) => {
      state.push(payload);
    },
    deleteTask: (state, { payload }: PayloadAction<string>) => {
      const taskFound = state.find(task => task.id === payload);
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      }
    },
  },
});

export const { createTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
