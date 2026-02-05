import { prepareChartData } from '@/lib/chart-utils';
import DayHistoryCard from '@/features/history/DayHistoryCard';
import DateNavigationHeader from '@/features/history/DateNavigationHeader';
import FocusTimeBarChart from '@/features/history/FocusTimeBarChart';
import FocusTrendChart from '@/features/history/FocusTrendChart';
import { useWeekNavigation } from '@/hooks/useWeekNavigation';
import { getDayStats } from '@/lib/utils';
import {
  useSelectedDate,
  useSetSelectedDate,
  useTodo,
} from '@/stores/useTodoStore';
import type { Todo } from '@/types/types';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import FocusHistoryLoading from '@/components/skeleton/FocusHistoryLoading';

export default function FocusHistoryPage() {
  const historyTodos = useTodo();
  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  const { isLoading } = useQuery({
    queryKey: ['focusHistory'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return historyTodos;
    },
    staleTime: 0,
  });

  const { baseDate, currentMonth, getPrevWeekDate, getNextWeekDate } =
    useWeekNavigation({ currentDate: selectedDate, allowFuture: false });

  const todosByDate = useMemo(
    () => groupTodosByDate(historyTodos),
    [historyTodos],
  );

  const sortedDates = useMemo(
    () => Object.keys(todosByDate).sort((a, b) => b.localeCompare(a)),
    [todosByDate],
  );

  const chartData = useMemo(() => prepareChartData(todosByDate), [todosByDate]);

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

  const goPrevWeek = () => setSelectedDate(getPrevWeekDate());
  const goNextWeek = () => {
    const next = getNextWeekDate();
    if (!next) return;
    setSelectedDate(next);
  };

  const nextWeekDate = getNextWeekDate();
  const isNextDisabled = !nextWeekDate;

  if (isLoading) return <FocusHistoryLoading />;

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

      {sortedDates.map((date) => (
        <DayHistoryCard
          key={date}
          date={date}
          dayTodos={todosByDate[date]}
          stats={getDayStats(todosByDate[date])}
        />
      ))}
    </div>
  );
}

const groupTodosByDate = (todos: Todo[]): Record<string, Todo[]> =>
  todos.reduce<Record<string, Todo[]>>((acc, todo) => {
    const dateKey = todo.date;
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(todo);
    return acc;
  }, {});
