import prepareChartData from '@/lib/chart-utils';
import DayHistoryCard from '@/features/history/DayHistoryCard';
import DateNavigationHeader from '@/components/common/DateNavigationHeader';
import FocusTimeBarChart from '@/features/history/FocusTimeBarChart';
import FocusTrendChart from '@/features/history/FocusTrendChart';
import useWeekNavigation from '@/hooks/useWeekNavigation';
import { useSelectedDate } from '@/stores/useTodoStore';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import FocusHistoryLoading from '@/components/skeleton/FocusHistoryLoading';
import ErrorState from '@/components/common/ErrorState';
import { useSession } from '@/stores/session';
import { useAllTodos } from '@/hooks/queries/useAllTodos';
import { useDailyAggregation } from '@/hooks/queries/focus/useDailyAggregation';
import { useHistoryDashboard } from '@/hooks/useHistoryDashboard';

export default function FocusHistoryPage() {
  const session = useSession();
  const selectedDate = useSelectedDate();
  const [historyBaseDate, setHistoryBaseDate] = useState(selectedDate);

  const userId = session?.user.id;

  const { baseDate, currentMonth, getPrevWeekDate, getNextWeekDate } =
    useWeekNavigation({ currentDate: historyBaseDate, allowFuture: false });

  const from = baseDate.startOf('week').format('YYYY-MM-DD');
  const to = baseDate.endOf('week').format('YYYY-MM-DD');

  const {
    data: historyTodos = [],
    isLoading: todosLoading,
    isError: todosError,
  } = useAllTodos(userId);

  const {
    data: dailyFocus = [],
    isLoading: focusLoading,
    isError: focusError,
  } = useDailyAggregation(userId, from, to);

  const historyStats = useHistoryDashboard(historyTodos, dailyFocus);

  const chartData = useMemo(
    () => prepareChartData(historyStats),
    [historyStats],
  );

  const weeklyData = useMemo(() => {
    const start = baseDate.startOf('day');
    const end = baseDate.endOf('week').endOf('day');

    return chartData.filter((d) => {
      const targetDate = dayjs(d.date);
      return (
        (targetDate.isSame(start) || targetDate.isAfter(start)) &&
        (targetDate.isSame(end) || targetDate.isBefore(end))
      );
    });
  }, [chartData, baseDate]);

  const goPrevWeek = () => setHistoryBaseDate(getPrevWeekDate());
  const goNextWeek = () => {
    const next = getNextWeekDate();
    if (!next) return;
    setHistoryBaseDate(next);
  };

  const nextWeekDate = getNextWeekDate();
  const isNextDisabled = !nextWeekDate;

  if (todosLoading || focusLoading) return <FocusHistoryLoading />;

  if (todosError || focusError)
    return <ErrorState message="Failed to load history data." />;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-3xl font-semibold">Focus History</h1>

      <div className="flex flex-col items-center justify-center gap-6 bg-muted/30 p-3rounded-xl">
        <DateNavigationHeader
          currentMonth={currentMonth}
          dateRange={`${baseDate.format('YYYY-MM-DD')} ~ ${baseDate.endOf('week').format('MM-DD')}`}
          isNextDisabled={isNextDisabled}
          onPrev={goPrevWeek}
          onNext={goNextWeek}
        />
        <div className="flex items-center gap-5">
          <FocusTrendChart data={weeklyData} baseDate={baseDate} />
          <FocusTimeBarChart data={weeklyData} baseDate={baseDate} />
        </div>
      </div>

      {historyStats.map((stat) => (
        <DayHistoryCard key={stat.date} date={stat.date} stats={stat} />
      ))}
    </div>
  );
}
