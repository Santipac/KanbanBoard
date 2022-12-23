import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FirebaseAuth } from '../firebase/config';
import { RootState } from '../store';
import { checkingUser, loginUser, logoutUser } from '../store/user/userSlice';
import { UserStatus } from '../types/enums';
import { ILogin, IRegister } from '../types/models';
import toast from 'react-hot-toast';
import { ErrorData } from '@firebase/util';

export const useAuthStore = () => {
  const { status, displayName, photoURL, uid, email } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const startLoginWithGoogle = async () => {
    try {
      dispatch(checkingUser());
      const result = await signInWithPopup(FirebaseAuth, provider);
      const { displayName, email, photoURL, uid } = result.user;
      dispatch(
        loginUser({
          displayName,
          email,
          photoURL,
          uid,
          status: UserStatus.AUTHENTICATED,
        })
      );
      navigate('/');
    } catch (error) {
      toast.error('No debe cerrar la pestaña');
    }
  };
  const startRegisterUser = async ({
    displayName,
    email,
    password,
  }: IRegister) => {
    try {
      dispatch(checkingUser());
      const resp = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      if (FirebaseAuth.currentUser === null) return;
      await updateProfile(FirebaseAuth.currentUser, { displayName });
      const { photoURL, uid } = resp.user;
      dispatch(
        loginUser({
          uid,
          photoURL,
          displayName,
          email,
          status: UserStatus.AUTHENTICATED,
        })
      );
      navigate('/');
    } catch (error) {
      toast.error(error.message.split(' ')[2]);
    }
  };

  const startLoginWithEmailPassword = async ({ email, password }: ILogin) => {
    try {
      dispatch(checkingUser());
      const resp = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      const { uid, photoURL, displayName } = resp.user;
      dispatch(
        loginUser({
          uid,
          email,
          photoURL,
          displayName,
          status: UserStatus.AUTHENTICATED,
        })
      );
      navigate('/');
    } catch (error) {
      toast.error(error.message.split(' ')[2]);
    }
  };

  const startSignOutUser = async () => {
    try {
      dispatch(checkingUser());
      await signOut(FirebaseAuth);
      dispatch(logoutUser());
      navigate('/auth');
    } catch (error) {
      toast.error(error.message.split(' ')[2]);
    }
  };
  return {
    startLoginWithGoogle,
    startLoginWithEmailPassword,
    startSignOutUser,
    startRegisterUser,
    status,
    displayName,
    photoURL,
    uid,
    email,
  };
};
