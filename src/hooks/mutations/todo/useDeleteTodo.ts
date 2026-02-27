import { useMutation } from '@tanstack/react-query';
import { deleteTodo } from '@/api/todo';
import type { UseMutationCallback } from '@/types/types';

export function useDeleteTodo(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
