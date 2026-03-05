import { formatTime } from '@/lib/utils';
import type { Todo } from '@/types/types';
import { useMemo } from 'react';

interface UseDayDashboardProps {
  todos: Todo[];
  totalFocusSeconds: number;
}

export default function useDayDashboard({
  todos,
  totalFocusSeconds,
}: UseDayDashboardProps) {
  const totalCount = todos.length;

  const completedCount = todos.filter(
    (todo) => todo.status === 'completed',
  ).length;

  const completionRate =
    totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0;

  const formattedFocusTime = formatTime(totalFocusSeconds).fullTimeDisplay;

  return {
    totalCount,
    completionRate,
    completedCount,
    formattedFocusTime,
  };
}
