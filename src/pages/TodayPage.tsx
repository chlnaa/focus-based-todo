import { useState } from 'react';
import { useSession } from '@/stores/session';
import { useSelectedDate, useSetSelectedDate } from '@/stores/useTodoStore';
import WeeklyCalendar from '@/features/date/WeeklyCalendar';
import MiniDashboard from '@/features/dashboard/MiniDashboard';
import TodoList from '@/features/todo/TodoList';
import useDayDashboard from '@/hooks/useDayDashboard';
import AddTodo from '@/features/todo/AddTodo';
import MiniDashboardSkeleton from '@/components/skeleton/MiniDashboardSkeleton';
import { TodoItemSkeleton } from '@/components/skeleton/TodoItemSkeleton';
import ReadOnlyMessage from '@/components/common/ReadOnlyMessage';
import EmptyTodo from '@/components/common/EmptyTodo';
import ErrorState from '@/components/common/ErrorState';
import dayjs from 'dayjs';
import { useTodayTodos } from '@/hooks/queries/useTodayTodos';

type ReadOnlyVariant = 'past' | 'future';

export default function TodayPage() {
  const session = useSession();
  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  const [viewDate, setViewDate] = useState(selectedDate);

  const {
    data: todosData = [],
    isLoading,
    isError,
  } = useTodayTodos(selectedDate, session?.user.id);

  const { formattedFocusTime, completionRate, completedCount, totalCount } =
    useDayDashboard({ todos: todosData, targetDate: selectedDate });

  const isPast = dayjs(selectedDate).isBefore(dayjs(), 'day');
  const isFuture = dayjs(selectedDate).isAfter(dayjs(), 'day');
  const readOnlyVariant: ReadOnlyVariant | null = isPast
    ? 'past'
    : isFuture
      ? 'future'
      : null;

  if (isError) return <ErrorState message="Failed to load data." />;

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
        <TodoList filteredTodos={todosData} />
      )}
    </div>
  );
}
