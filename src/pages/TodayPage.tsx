import { useSelectedDate, useTodo } from '@/stores/useTodoStore';
import WeeklyCalendar from '@/features/date/WeeklyCalendar';
import MiniDashboard from '@/features/dashboard/MiniDashboard';
import { formatTime, getDayStats } from '@/lib/utils';
import TodoList from '@/features/todo/TodoList';

export default function TodayPage() {
  const todos = useTodo();

  const selectedDate = useSelectedDate();

  const filteredTodos = todos.filter((t) => t.date === selectedDate);

  const dashboardDate = getDayStats(filteredTodos);

  const formattedFocusTime = formatTime(
    dashboardDate.totalFocusSeconds,
  ).fullTimeDisplay;

  const { completionRate, completedCount, totalCount } = dashboardDate;

  return (
    <div className="flex flex-col">
      <WeeklyCalendar />
      <MiniDashboard
        formattedFocusTime={formattedFocusTime}
        completionRate={completionRate}
        completedCount={completedCount}
        totalCount={totalCount}
      />
      <TodoList filteredTodos={filteredTodos} />
    </div>
  );
}
