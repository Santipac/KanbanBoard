import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStatus } from '../../types/enums';
import { IUser } from '../../types/models';

const initialState: IUser = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
  status: UserStatus.NOT_AUTHENTICATED,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    checkingUser: state => {
      state.status = UserStatus.PENDING;
    },
    loginUser: (state, { payload }: PayloadAction<IUser>) => {
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.status = UserStatus.AUTHENTICATED;
    },
    logoutUser: state => {
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.status = UserStatus.NOT_AUTHENTICATED;
    },
  },
});

export const { loginUser, logoutUser, checkingUser } = userSlice.actions;

export default userSlice.reducer;
