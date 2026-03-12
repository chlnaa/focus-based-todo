import { getTodosByDate } from '@/api/todo';
import { todoKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export default function useHistoryTodos(
  date: string,
  userId: string | undefined,
) {
  return useQuery({
    queryKey: userId ? todoKeys.byDate(date, userId) : [],
    queryFn: () => getTodosByDate(date, userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
