import { formatTime, getDayStats } from '@/lib/utils';
import type { Todo } from '@/types/types';
import { useMemo } from 'react';

interface UseDayDashboardProps {
  todosData: Todo[];
  formattedFocusTime: string;
  completionRate: number;
  completedCount: number;
  totalCount: number;
}

export const useDayDashboard = (
  todos: Todo[],
  targetDate: string,
): UseDayDashboardProps => {
  const todosData = useMemo(
    () => todos.filter((todo) => todo.date === targetDate),
    [todos, targetDate],
  );

  const stats = useMemo(() => getDayStats(todosData), [todosData]);
  const formattedFocusTime = useMemo(
    () => formatTime(stats.totalFocusSeconds).fullTimeDisplay,
    [stats.totalFocusSeconds],
  );

  return {
    todosData,
    formattedFocusTime,
    completionRate: stats.completionRate,
    completedCount: stats.completedCount || 0,
    totalCount: stats.totalCount,
  };
};
