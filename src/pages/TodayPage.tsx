import { useSelectedDate, useTodo } from '@/stores/useTodoStore';
import WeeklyCalendar from '@/features/date/WeeklyCalendar';
import MiniDashboard from '@/features/dashboard/MiniDashboard';
import TodoList from '@/features/todo/TodoList';
import { useDayDashboard } from '@/hooks/useDayDashboard';

export default function TodayPage() {
  const todos = useTodo();

  const selectedDate = useSelectedDate();

  const {
    todosData,
    formattedFocusTime,
    completionRate,
    completedCount,
    totalCount,
  } = useDayDashboard(todos, selectedDate);

  return (
    <div className="flex flex-col">
      <WeeklyCalendar />
      <MiniDashboard
        formattedFocusTime={formattedFocusTime}
        completionRate={completionRate}
        completedCount={completedCount}
        totalCount={totalCount}
      />
      <TodoList filteredTodos={todosData} />
    </div>
  );
}
