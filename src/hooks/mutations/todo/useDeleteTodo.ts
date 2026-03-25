import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@/api/todo';
import type { TodoEntity, UseMutationCallback } from '@/types/types';
import { todoKeys } from '@/constants/queryKeys';
import { useSession } from '@/stores/session';

export default function useDeleteTodo(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),

    onMutate: async (id: string) => {
      if (!userId) return;

      await queryClient.cancelQueries({
        queryKey: todoKeys.dateRoot(),
      });

      const queries = queryClient.getQueriesData({
        queryKey: todoKeys.dateRoot(),
      });

      const previousDates = queries.map(([key, data]) => ({
        key,
        data,
      }));

      queries.forEach(([key, _]) => {
        queryClient.setQueryData(key, (oldData: any) => {
          if (!oldData) return oldData;

          if (oldData.pages) {
            return {
              ...oldData,
              pages: oldData.pages.map((page: any) => ({
                ...page,
                data: page.data.filter((todo: TodoEntity) => todo.id !== id),
              })),
            };
          }

          return oldData?.filter((todo: TodoEntity) => todo.id !== id);
        });
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

      callbacks?.onSuccess?.();
    },

    onError: (error, _, context) => {
      context?.previousDates?.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });

      if (context?.previousItem) {
        queryClient.setQueryData(context.itemKey, context.previousItem);
      }

      callbacks?.onError?.(error);
    },
  });
}
