import { useQuery } from '@tanstack/react-query';
import { getDailyAggregation } from '@/api/focus';
import { focusKeys } from '@/constants/queryKeys';

export interface DailyAggregation {
  date: string;
  totalSeconds: number;
}

export default function useDailyAggregation(
  userId?: string,
  from?: string,
  to?: string,
) {
  return useQuery({
    queryKey: userId && from && to ? focusKeys.daily(userId, from, to) : [],

    queryFn: async (): Promise<DailyAggregation[]> => {
      if (!userId || !from || !to) return [];

      const data = await getDailyAggregation(userId, from, to);

      return Object.entries(data).map(([date, totalSeconds]) => ({
        date,
        totalSeconds,
      }));
    },

    enabled: !!userId && !!from && !!to,
  });
}
