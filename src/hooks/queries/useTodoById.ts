import { getTodoById } from '@/api/todo';
import { todoKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useTodoById(id?: string) {
  return useQuery({
    queryKey: id ? todoKeys.detail(id) : [],
    queryFn: () => getTodoById(id!),
    enabled: !!id,
  });
}
