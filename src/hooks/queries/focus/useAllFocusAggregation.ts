import { getAllDailyAggregation } from '@/api/focus';
import { focusKeys } from '@/constants/queryKeys';
import type { DailyAggregation } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

export default function useAllFocusAggregation(userId?: string) {
  return useQuery({
    queryKey: userId ? focusKeys.all(userId) : [],

    queryFn: async (): Promise<DailyAggregation[]> => {
      if (!userId) return [];

      const data = await getAllDailyAggregation(userId);

      return Object.entries(data).map(([date, totalSeconds]) => ({
        date,
        totalSeconds,
      }));
    },

    enabled: !!userId,
  });
}
