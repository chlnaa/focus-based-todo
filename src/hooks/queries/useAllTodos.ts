import { getAllTodos } from '@/api/todo';
import { useQuery } from '@tanstack/react-query';

export function useAllTodos(userId?: string) {
  return useQuery({
    queryKey: ['todo', 'all', userId],
    queryFn: () => getAllTodos(userId!),
    enabled: !!userId,
  });
}
