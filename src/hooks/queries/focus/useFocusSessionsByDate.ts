import { getFocusSessionsByDate } from '@/api/focus';
import { focusKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

export default function useFocusSessionsByDate(date: string, userId?: string) {
  const isToday = dayjs(date).isSame(dayjs(), 'day');

  return useQuery({
    queryKey: userId ? focusKeys.byDate(userId, date) : [],
    queryFn: () => getFocusSessionsByDate(userId!, date),
    enabled: !!userId,
    staleTime: isToday ? 1000 * 60 * 3 : Infinity,
    refetchOnWindowFocus: false,
  });
}
