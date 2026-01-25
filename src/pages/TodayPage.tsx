import { useSelectedDate, useTodo } from '@/stores/useTodoStore';
import WeeklyCalendar from '@/features/date/WeeklyCalendar';
import MiniDashboard from '@/features/dashboard/MiniDashboard';
import { formatTime } from '@/lib/utils';
import TodoList from '@/features/todo/TodoList';

export default function TodayPage() {
  const todos = useTodo();

  const selectedDate = useSelectedDate();

  const filteredTodos = todos.filter((t) => t.date === selectedDate);
  const totalCount = filteredTodos.length;
  const completedCount = filteredTodos.filter(
    (t) => t.status === 'completed',
  ).length;
  const completedRate =
    totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0;
  const totalFocusTimeSec = filteredTodos.reduce(
    (acc, cur) => acc + (cur.totalFocusTime || 0),
    0,
  );
  const formattedFocusTime = formatTime(totalFocusTimeSec).fullTimeDisplay;

  return (
    <div className="flex flex-col m-auto w-full max-w-175 mt-7">
      <WeeklyCalendar />
      <MiniDashboard
        formattedFocusTime={formattedFocusTime}
        completedRate={completedRate}
        completedCount={completedCount}
        totalCount={totalCount}
      />
      <TodoList filteredTodos={filteredTodos} />
    </div>
  );
}
