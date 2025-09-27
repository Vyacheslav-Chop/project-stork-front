export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}

export interface CreateTaskProps {
  name: string;
  date: string;
}

export interface UpdateTaskProps {
  name?: string;
  date?: string;
}
