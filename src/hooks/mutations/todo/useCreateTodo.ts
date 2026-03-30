import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '@/api/todo';
import type { TodoEntity, UseMutationCallback } from '@/types/types';
import { todoKeys } from '@/constants/queryKeys';
import { useSession } from '@/stores/session';

export default function useCreateTodo(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: createTodo,

    onMutate: async (newTodo) => {
      if (!userId) return;

      await queryClient.cancelQueries({
        queryKey: todoKeys.allTodos(userId),
      });

      const previous = queryClient.getQueryData<TodoEntity[]>(
        todoKeys.allTodos(userId),
      );

      queryClient.setQueryData(
        todoKeys.allTodos(userId),
        (old: TodoEntity[] = []) => {
          return [...old, newTodo];
        },
      );

      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous && userId) {
        queryClient.setQueryData(todoKeys.allTodos(userId), context.previous);
      }
    },

    onSettled: async (_, __, variables) => {
      if (!userId) return;

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: todoKeys.byDate(variables.date, userId),
        }),
        queryClient.invalidateQueries({
          queryKey: todoKeys.allTodos(userId),
        }),
      ]);

      callbacks?.onSuccess?.();
    },
  });
}
