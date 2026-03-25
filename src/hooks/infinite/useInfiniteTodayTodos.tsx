import { fetchInfiniteTodayTodos } from '@/api/todo';
import { todoKeys } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

type InfiniteTodayTodosParams = {
  date: string;
  userId?: string;
};

export default function useInfiniteTodayTodos({
  date,
  userId,
}: InfiniteTodayTodosParams) {
  return useInfiniteQuery({
    queryKey: userId ? todoKeys.byDate(date, userId) : [],
    queryFn: ({ pageParam }) =>
      fetchInfiniteTodayTodos({
        pageParam,
        date,
        userId: userId!,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
    enabled: !!userId,
  });
}
