import { getTodoById } from '@/api/todo';
import { useQuery } from '@tanstack/react-query';

export function useTodoById(id?: string) {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodoById(id!),
    enabled: !!id,
  });
}
