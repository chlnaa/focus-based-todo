import {
  useSelectedDate,
  useSetSelectedDate,
  useTodo,
} from '@/stores/useTodoStore';
import WeeklyCalendar from '@/features/date/WeeklyCalendar';
import MiniDashboard from '@/features/dashboard/MiniDashboard';
import TodoList from '@/features/todo/TodoList';
import { useDayDashboard } from '@/hooks/useDayDashboard';
import { useQuery } from '@tanstack/react-query';
import AddTodo from '@/features/todo/AddTodo';
import MiniDashboardSkeleton from '@/components/skeleton/MiniDashboardSkeleton';
import { TodoItemSkeleton } from '@/components/skeleton/TodoItemSkeleton';
import ReadOnlyMessage from '@/components/common/ReadOnlyMessage';
import EmptyTodo from '@/components/common/EmptyTodo';
import ErrorState from '@/components/common/ErrorState';
import dayjs from 'dayjs';

type ReadOnlyVariant = 'past' | 'future';

export default function TodayPage() {
  const todos = useTodo();
  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  const isPast = dayjs(selectedDate).isBefore(dayjs(), 'day');
  const isFuture = dayjs(selectedDate).isAfter(dayjs(), 'day');
  const readOnlyVariant: ReadOnlyVariant | null = isPast
    ? 'past'
    : isFuture
      ? 'future'
      : null;

  const {
    todosData,
    formattedFocusTime,
    completionRate,
    completedCount,
    totalCount,
  } = useDayDashboard(todos, selectedDate);

  const { isLoading, isError } = useQuery({
    queryKey: ['todos', selectedDate],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return selectedDate;
    },
    staleTime: 0,
  });

  if (isError) return <ErrorState message="Failed to load today's data." />;

  return (
    <div className="flex flex-col gap-4">
      <WeeklyCalendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
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
      ) : todosData.length === 0 ? (
        <EmptyTodo />
      ) : (
        <TodoList filteredTodos={todosData} />
      )}
    </div>
  );
}
