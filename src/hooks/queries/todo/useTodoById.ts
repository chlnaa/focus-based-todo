import { getTodoById } from '@/api/todo';
import { todoKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export default function useTodoById(id?: string) {
  return useQuery({
    queryKey: id ? todoKeys.byId(id) : [],
    queryFn: () => getTodoById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });
}
