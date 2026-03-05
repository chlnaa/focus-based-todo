import { getTodayFocusTime } from '@/api/focus';
import { focusKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export default function useTodayFocusTime(userId?: string, date?: string) {
  return useQuery({
    queryKey: userId && date ? focusKeys.byDate(userId, date) : [],
    queryFn: () => getTodayFocusTime(userId!, date!),
    enabled: !!userId && !!date,
  });
}
