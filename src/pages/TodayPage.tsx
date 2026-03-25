import { useState } from 'react';
import { useSession } from '@/stores/session';
import { useSelectedDate, useSetSelectedDate } from '@/stores/useTodoStore';
import WeeklyCalendar from '@/features/date/WeeklyCalendar';
import MiniDashboard from '@/features/dashboard/MiniDashboard';
import TodoList from '@/features/todo/TodoList';
import useDayDashboard from '@/hooks/useDayDashboard';
import AddTodo from '@/features/todo/AddTodo';
import MiniDashboardSkeleton from '@/components/skeleton/MiniDashboardSkeleton';
import TodoItemSkeleton from '@/components/skeleton/TodoItemSkeleton';
import ReadOnlyMessage from '@/components/common/ReadOnlyMessage';
import EmptyTodo from '@/components/common/EmptyTodo';
import ErrorState from '@/components/common/ErrorState';
import dayjs from 'dayjs';
import useTodayFocusTime from '@/hooks/queries/focus/useTodayFocusTime';
import useInfiniteTodayTodos from '@/hooks/infinite/useInfiniteTodayTodos';
import useInfiniteScroll from '@/hooks/infinite/useInfiniteScroll';

type ReadOnlyVariant = 'past' | 'future';

export default function TodayPage() {
  const session = useSession();
  const userId = session?.user.id;

  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  const [viewDate, setViewDate] = useState(selectedDate);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteTodayTodos({
    date: selectedDate,
    userId,
  });

  const todosData = data?.pages.flatMap((page) => page.data) ?? [];

  const { data: totalFocusSeconds = 0 } = useTodayFocusTime(
    userId ?? '',
    selectedDate,
  );

  const { formattedFocusTime, completionRate, completedCount, totalCount } =
    useDayDashboard({
      todos: todosData,
      totalFocusSeconds,
    });

  const isPast = dayjs(selectedDate).isBefore(dayjs(), 'day');
  const isFuture = dayjs(selectedDate).isAfter(dayjs(), 'day');
  const readOnlyVariant: ReadOnlyVariant | null = isPast
    ? 'past'
    : isFuture
      ? 'future'
      : null;

  if (isError) return <ErrorState message="Failed to load data." />;

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div className="flex flex-col gap-4">
      <WeeklyCalendar
        selectedDate={selectedDate}
        viewDate={viewDate}
        onChangeViewDate={setViewDate}
        onSelectDate={setSelectedDate}
      />

      {isLoading ? (
        <MiniDashboardSkeleton />
      ) : (
        <MiniDashboard
          formattedFocusTime={formattedFocusTime}
          completionRate={completionRate}
          completedCount={completedCount}
          totalCount={totalCount}
        />
      )}

      {readOnlyVariant && <ReadOnlyMessage variant={readOnlyVariant} />}

      <AddTodo
        selectedDate={selectedDate}
        disabled={readOnlyVariant !== null}
      />

      {isLoading ? (
        <TodoItemSkeleton />
      ) : !readOnlyVariant && todosData.length === 0 ? (
        <EmptyTodo />
      ) : (
        <>
          <TodoList filteredTodos={todosData} />
          <div ref={loadMoreRef} />
          {isFetchingNextPage && <TodoItemSkeleton />}
        </>
      )}
    </div>
  );
}
