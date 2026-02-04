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

export default function TodayPage() {
  const todos = useTodo();
  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  const {
    todosData,
    formattedFocusTime,
    completionRate,
    completedCount,
    totalCount,
  } = useDayDashboard(todos, selectedDate);

  const { isLoading } = useQuery({
    queryKey: ['todos', selectedDate],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return selectedDate;
    },
    staleTime: 0,
  });

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

      <AddTodo selectedDate={selectedDate} />

      {isLoading ? (
        <TodoItemSkeleton />
      ) : (
        <TodoList filteredTodos={todosData} />
      )}
    </div>
  );
}
