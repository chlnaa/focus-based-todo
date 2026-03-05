import { useMemo } from 'react';
import dayjs from 'dayjs';
import type { HistoryStat, Todo } from '@/types/types';

interface DailyFocus {
  date: string;
  totalSeconds: number;
}

export function useHistoryDashboard(todos: Todo[], focusData: DailyFocus[]) {
  return useMemo<HistoryStat[]>(() => {
    const todoMap = new Map<string, { total: number; completed: number }>();

    for (const todo of todos) {
      const date = todo.date;

      if (!todoMap.has(date)) {
        todoMap.set(date, { total: 0, completed: 0 });
      }

      const entry = todoMap.get(date)!;
      entry.total += 1;
      if (todo.status === 'completed') {
        entry.completed += 1;
      }
    }

    const result: HistoryStat[] = [];

    const allDates = new Set([
      ...focusData.map((f) => f.date),
      ...todoMap.keys(),
    ]);

    for (const date of allDates) {
      const todoEntry = todoMap.get(date);
      const focusEntry = focusData.find((f) => f.date === date);

      const totalCount = todoEntry?.total ?? 0;
      const completedCount = todoEntry?.completed ?? 0;

      result.push({
        date,
        totalSeconds: focusEntry?.totalSeconds ?? 0,
        totalCount,
        completedCount,
        completionRate:
          totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0,
      });
    }

    return result.sort((a, b) =>
      dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1,
    );
  }, [todos, focusData]);
}
