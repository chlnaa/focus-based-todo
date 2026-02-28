import { getAllTodos } from '@/api/todo';
import { todoKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useAllTodos(userId?: string) {
  return useQuery({
    queryKey: userId ? todoKeys.allTodos(userId) : [],
    queryFn: () => getAllTodos(userId!),
    enabled: !!userId,
  });
}
