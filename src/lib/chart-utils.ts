import dayjs from 'dayjs';
import type { ChartData, DailyAggregation, HistoryStat } from '@/types/types';

export function prepareFocusChartData(
  focusData: DailyAggregation[],
): ChartData[] {
  if (focusData.length === 0) return [];

  const sorted = [...focusData].sort((a, b) =>
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
        completionRate: 0,
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

export function prepareTrendChartData(
  historyStats: HistoryStat[],
  baseDate: dayjs.Dayjs,
): ChartData[] {
  const startOfWeek = baseDate.startOf('week');
  const endOfWeek = baseDate.endOf('week');

  const statMap = new Map(historyStats.map((stat) => [stat.date, stat]));

  const result: ChartData[] = [];

  let current = startOfWeek;

  while (current.isBefore(endOfWeek) || current.isSame(endOfWeek, 'day')) {
    const formatted = current.format('YYYY-MM-DD');
    const found = statMap.get(formatted);

    result.push({
      date: current.toDate(),
      completionRate: found?.completionRate ?? 0,
      totalMinutes: Math.floor((found?.totalSeconds ?? 0) / 60),
    });

    current = current.add(1, 'day');
  }

  return result;
}
