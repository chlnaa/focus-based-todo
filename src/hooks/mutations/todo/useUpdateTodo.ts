import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/api/todo';
import type { TodoEntity, UseMutationCallback } from '@/types/types';
import { todoKeys } from '@/constants/queryKeys';
import { useSelectedDate } from '@/stores/useTodoStore';

type UpdateTodoVariables = {
  id: string;
  updates: Partial<TodoEntity>;
  date: string;
};

export function useUpdateTodo(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const selectedDate = useSelectedDate();

  return useMutation({
    mutationFn: ({ id, updates }: UpdateTodoVariables) =>
      updateTodo(id, updates),

    onSuccess: async () => {
      const queryKey = todoKeys.byDate(selectedDate);
      await queryClient.invalidateQueries({ queryKey });
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },

    onMutate: async ({ id, updates, date }) => {
      const queryKey = todoKeys.byDate(date);
      await queryClient.cancelQueries({ queryKey });

      const previousTodos = queryClient.getQueryData<TodoEntity[]>(queryKey);

      queryClient.setQueryData<TodoEntity[]>(
        queryKey,
        (old) =>
          old?.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo,
          ) ?? [],
      );

      return { previousTodos, queryKey };
    },

    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
