import DayHistoryCard from '@/features/history/DayHistoryCard';
import DateNavigationHeader from '@/components/common/DateNavigationHeader';
import FocusTimeBarChart from '@/features/history/FocusTimeBarChart';
import FocusTrendChart from '@/features/history/FocusTrendChart';
import useWeekNavigation from '@/hooks/useWeekNavigation';
import { useMemo, useState } from 'react';
import FocusHistoryLoading from '@/components/skeleton/FocusHistoryLoading';
import ErrorState from '@/components/common/ErrorState';
import { useSession } from '@/stores/session';
import useAllTodos from '@/hooks/queries/todo/useAllTodos';
import useWeeklyFocusAggregation from '@/hooks/queries/focus/useWeeklyFocusAggregation';
import useHistoryDashboard from '@/hooks/useHistoryDashboard';
import useAllFocusAggregation from '@/hooks/queries/focus/useAllFocusAggregation';
import {
  prepareFocusChartData,
  prepareTrendChartData,
} from '@/lib/chart-utils';
import dayjs from 'dayjs';
import useInfiniteScroll from '@/hooks/infinite/useInfiniteScroll';

export default function FocusHistoryPage() {
  const session = useSession();
  const today = dayjs().format('YYYY-MM-DD');
  const [historyBaseDate, setHistoryBaseDate] = useState(today);

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
    data: weeklyFocus = [],
    isLoading: focusLoading,
    isError: focusError,
  } = useWeeklyFocusAggregation(userId, from, to);

  const { data: allFocus = [] } = useAllFocusAggregation(userId);

  const historyStats = useHistoryDashboard(historyTodos, allFocus);

  const trendChartData = useMemo(
    () => prepareTrendChartData(historyStats, baseDate),
    [historyStats, baseDate],
  );

  const barChartData = useMemo(
    () => prepareFocusChartData(weeklyFocus),
    [weeklyFocus],
  );

  const goPrevWeek = () => setHistoryBaseDate(getPrevWeekDate());
  const goNextWeek = () => {
    const next = getNextWeekDate();
    if (!next) return;
    setHistoryBaseDate(next);
  };

  const nextWeekDate = getNextWeekDate();
  const isNextDisabled = !nextWeekDate;

  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleStats = historyStats.slice(0, visibleCount);

  const hasNextPage = visibleCount < historyStats.length;

  const fetchNextPage = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

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
          <FocusTrendChart data={trendChartData} baseDate={baseDate} />
          <FocusTimeBarChart data={barChartData} baseDate={baseDate} />
        </div>
      </div>

      {visibleStats.map((stat) => (
        <DayHistoryCard key={stat.date} date={stat.date} stats={stat} />
      ))}

      <div ref={loadMoreRef} />
    </div>
  );
}
