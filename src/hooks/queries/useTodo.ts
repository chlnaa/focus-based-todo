import { getTodosByDate } from '@/api/todo';
import { useQuery } from '@tanstack/react-query';

export function useTodo(date: string, userId: string | undefined) {
  return useQuery({
    queryKey: ['todo', date],
    queryFn: () => getTodosByDate(date, userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
