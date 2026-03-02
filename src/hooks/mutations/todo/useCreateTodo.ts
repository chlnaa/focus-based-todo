import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '@/api/todo';
import type { UseMutationCallback } from '@/types/types';
import { todoKeys } from '@/constants/queryKeys';
import { useSession } from '@/stores/session';

export function useCreateTodo(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: createTodo,
    onSuccess: async (_, variables) => {
      if (!userId) return;

      await queryClient.invalidateQueries({
        queryKey: todoKeys.byDate(variables.date, userId),
      });
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
