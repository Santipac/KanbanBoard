import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { RootState } from '../store';
import { createTask, deleteTask } from '../store/task/taskSlice';
import { ColumnType } from '../types/enums';

export const useTaskStore = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task);

  const startCreatingTask = (column: ColumnType) => {
    dispatch(createTask({ title: '', column, id: uuid(), color: 'green' }));
  };

  const startDeletingTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  return { tasks, startCreatingTask, startDeletingTask };
};
