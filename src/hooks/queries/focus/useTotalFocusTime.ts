import { getTotalFocusTime } from '@/api/focus';
import { focusKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export default function useTotalFocusTime(userId?: string) {
  return useQuery({
    queryKey: userId ? focusKeys.total(userId) : [],
    queryFn: () => getTotalFocusTime(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60,
  });
}
