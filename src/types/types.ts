export type TodoStatus = 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;

  /** Scheduled date (Format: YYYY-MM-DD) */
  date: string;

  /** Creation timestamp in milliseconds (Unix time) */
  createdAt: number;

  status: TodoStatus;

  /** Total focus duration in seconds */
  totalFocusTime: number;
}

export type TodoListVariant = 'groupedByDate' | 'flat';
