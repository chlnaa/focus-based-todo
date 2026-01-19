export type TodoStatus = 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  date: string;
  createdAt: number;
  status: TodoStatus;
  totalFocusTime: number;
}
