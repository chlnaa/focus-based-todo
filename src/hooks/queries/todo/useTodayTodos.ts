import { getTodosByDate } from '@/api/todo';
import { todoKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

export default function useTodayTodos(
  date: string,
  userId: string | undefined,
) {
  const isToday = dayjs(date).isSame(dayjs(), 'day');

  return useQuery({
    queryKey: userId ? todoKeys.byDate(date, userId) : [],
    queryFn: () => getTodosByDate(date, userId!),
    enabled: !!userId,
    staleTime: isToday ? 1000 * 60 * 3 : Infinity,
    refetchOnWindowFocus: false,
  });
}
