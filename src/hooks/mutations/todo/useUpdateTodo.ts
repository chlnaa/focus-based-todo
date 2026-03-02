import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/api/todo';
import type { TodoEntity, UseMutationCallback } from '@/types/types';
import { todoKeys } from '@/constants/queryKeys';
import { useSession } from '@/stores/session';

type UpdateTodoVariables = {
  id: string;
  updates: Partial<TodoEntity>;
  date: string;
};

export function useUpdateTodo(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: ({ id, updates }: UpdateTodoVariables) =>
      updateTodo(id, updates),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      });
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },

    onMutate: async ({ id, updates, date }) => {
      if (!userId) return;

      await queryClient.cancelQueries({
        queryKey: todoKeys.all,
      });

      const dateKey = todoKeys.byDate(date, userId);
      const itemKey = todoKeys.byId(id);

      const previousTodos = queryClient.getQueryData<TodoEntity[]>(dateKey);

      const previousItem = queryClient.getQueryData<TodoEntity>(itemKey);

      queryClient.setQueryData<TodoEntity[]>(
        dateKey,
        (old) =>
          old?.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo,
          ) ?? [],
      );

      queryClient.setQueryData<TodoEntity>(itemKey, (old) =>
        old ? { ...old, ...updates } : old,
      );

      return { previousTodos, previousItem, dateKey, itemKey };
    },

    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(context.dateKey, context.previousTodos);
      }

      if (context?.previousItem) {
        queryClient.setQueryData(context.itemKey, context.previousItem);
      }
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
