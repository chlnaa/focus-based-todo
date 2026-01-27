import { useParams } from 'react-router';
import { useTodo } from '@/stores/useTodoStore';
import MiniDashboard from '../dashboard/MiniDashboard';
import HistoryTodoRow from './HistoryTodoRow';
import { useDayDashboard } from '@/hooks/useDayDashboard';

export default function HistoryDetail() {
  const { date } = useParams<{ date: string }>();
  const todos = useTodo();

  const {
    todosData,
    formattedFocusTime,
    completionRate,
    completedCount,
    totalCount,
  } = useDayDashboard(todos, date!);

  return (
    <div className="mt-5 border-2 rounded-4xl p-3">
      <div className="flex items-center gap-5 px-5 text-2xl">
        <div>{date}</div>
        <h1>Focus Daily Log</h1>
      </div>
      <MiniDashboard
        formattedFocusTime={formattedFocusTime}
        completionRate={completionRate}
        completedCount={completedCount}
        totalCount={totalCount}
      />
      <ul>
        {todosData.map((todo) => (
          <HistoryTodoRow key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
