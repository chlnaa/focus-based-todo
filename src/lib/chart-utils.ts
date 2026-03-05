import dayjs from 'dayjs';
import type { ChartData, HistoryStat } from '@/types/types';

export default function prepareChartData(
  historyStats: HistoryStat[],
): ChartData[] {
  if (historyStats.length === 0) return [];

  const sorted = [...historyStats].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1,
  );

  const firstDate = dayjs(sorted[0].date);
  const lastDate = dayjs(sorted[sorted.length - 1].date);

  const filledData: ChartData[] = [];
  let runner = firstDate;

  while (runner.isBefore(lastDate) || runner.isSame(lastDate, 'day')) {
    const currentFormatted = runner.format('YYYY-MM-DD');
    const foundEntry = sorted.find((e) => e.date === currentFormatted);

    if (foundEntry) {
      filledData.push({
        date: runner.toDate(),
        completionRate: foundEntry.completionRate,
        totalMinutes: Math.floor(foundEntry.totalSeconds / 60),
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
}
