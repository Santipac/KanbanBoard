import { configureStore } from '@reduxjs/toolkit';
import entryReducer from './entries/entrySlice';
import uiReducer from './ui/uiSlice';

import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    entries: entryReducer,
    ui: uiReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
