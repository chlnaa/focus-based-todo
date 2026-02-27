import { useMutation } from '@tanstack/react-query';
import { updateTodo } from '@/api/todo';
import type { TodoEntity, UseMutationCallback } from '@/types/types';

export function useUpdateTodo(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<TodoEntity>;
    }) => updateTodo(id, updates),

    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
