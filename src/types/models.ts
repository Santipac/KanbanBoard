import { ColumnType, UserStatus } from './enums';

export interface TaskModel {
  id: string;
  title: string;
  column: ColumnType;
  color: string;
}

export interface IUser {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  status: UserStatus;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  displayName: string;
  email: string;
  password: string;
}
