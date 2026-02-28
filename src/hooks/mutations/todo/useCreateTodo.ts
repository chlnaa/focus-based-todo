import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '@/api/todo';
import type { UseMutationCallback } from '@/types/types';
import { useSelectedDate } from '@/stores/useTodoStore';
import { todoKeys } from '@/constants/queryKeys';

export function useCreateTodo(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const selectedDate = useSelectedDate();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: async () => {
      const queryKey = todoKeys.byDate(selectedDate);
      await queryClient.invalidateQueries({ queryKey });
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
