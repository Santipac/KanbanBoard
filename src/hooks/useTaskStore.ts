import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { RootState } from '../store';

export const useTaskStore = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entries);

  return { entries };
};
