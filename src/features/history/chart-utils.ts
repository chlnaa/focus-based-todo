import dayjs from 'dayjs';
import { getDayStats } from '@/lib/utils';
import type { ChartData, Todo } from '@/types/types';

export const prepareChartData = (
  todosByDate: Record<string, Todo[]>,
): ChartData[] => {
  const existingEntries = Object.entries(todosByDate)
    .map(([dateStr, todos]) => ({
      dateStr,
      stats: getDayStats(todos),
    }))
    .sort((a, b) => (dayjs(a.dateStr).isAfter(dayjs(b.dateStr)) ? 1 : -1));

  if (existingEntries.length === 0) return [];

  const firstDate = dayjs(existingEntries[0].dateStr);
  const lastDate = dayjs(existingEntries[existingEntries.length - 1].dateStr);

  const filledData: ChartData[] = [];
  let runner = firstDate;

  while (runner.isBefore(lastDate) || runner.isSame(lastDate, 'day')) {
    const currentFormatted = runner.format('YYYY-MM-DD');
    const foundEntry = existingEntries.find(
      (e) => e.dateStr === currentFormatted,
    );

    if (foundEntry) {
      filledData.push({
        date: runner.toDate(),
        completionRate: foundEntry.stats.completionRate,
        totalMinutes: Math.floor(foundEntry.stats.totalFocusSeconds / 60),
      });
    } else {
      filledData.push({
        date: runner.toDate(),
        completionRate: 0,
        totalMinutes: 0,
      });
    }

    runner = runner.add(1, 'day');
  }

  return filledData;
};
