import { getTodoFocusTime } from '@/api/focus';
import { focusKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export default function useTodoFocusTime(userId?: string, todoId?: string) {
  return useQuery({
    queryKey: userId && todoId ? focusKeys.todo(userId, todoId) : [],
    queryFn: () => getTodoFocusTime(todoId!),
    enabled: !!userId && !!todoId,
  });
}
