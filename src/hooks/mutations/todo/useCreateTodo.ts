import { useMutation } from '@tanstack/react-query';
import { createTodo } from '@/api/todo';
import type { UseMutationCallback } from '@/types/types';

export function useCreateTodo(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
