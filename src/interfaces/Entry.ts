export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus;
  color: string;
}

export type EntryStatus = 'To-do' | 'In Progress' | 'Completed';
