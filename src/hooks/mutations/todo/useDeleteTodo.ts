import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@/api/todo';
import type { TodoEntity, UseMutationCallback } from '@/types/types';
import { todoKeys } from '@/constants/queryKeys';
import { useSession } from '@/stores/session';

export function useDeleteTodo(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),

    onMutate: async (id: string) => {
      if (!userId) return;

      await queryClient.cancelQueries({
        queryKey: todoKeys.all,
      });

      const queries = queryClient.getQueriesData<TodoEntity[]>({
        queryKey: todoKeys.dateRoot(),
      });

      const previousDates = queries.map(([key, data]) => ({
        key,
        data,
      }));

      queries.forEach(([key, old]) => {
        queryClient.setQueryData(
          key,
          old?.filter((todo) => todo.id !== id),
        );
      });

      const itemKey = todoKeys.byId(id);
      const previousItem = queryClient.getQueryData(itemKey);

      queryClient.removeQueries({ queryKey: itemKey });

      return { previousDates, previousItem, itemKey };
    },

    onSettled: async () => {
      if (!userId) return;

      await queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      });
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },

    onError: (error, _, context) => {
      context?.previousDates?.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });

      if (context?.previousItem) {
        queryClient.setQueryData(context.itemKey, context.previousItem);
      }
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
