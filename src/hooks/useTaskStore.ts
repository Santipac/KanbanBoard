import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { createTask, deleteTask } from '../store/task/taskSlice';
import { TaskModel } from '../types/models';

export const useTaskStore = () => {
  const tasks = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch();
  const startCreateTask = (task: TaskModel) => {
    dispatch(createTask(task));
  };

  const startDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  return { startCreateTask, startDeleteTask };
};
