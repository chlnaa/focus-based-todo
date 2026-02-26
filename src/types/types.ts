import type { Database } from '@/database.types';

export type TodoEntity = Database['public']['Tables']['todo']['Row'];
export type TodoInsert = Database['public']['Tables']['todo']['Insert'];

export type TodoStatus = 'active' | 'completed';

export interface Todo extends TodoEntity {}

export interface ChartData {
  date: Date;
  completionRate: number;
  totalMinutes: number;
}

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
