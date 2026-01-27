import { formatTime, getDayStats } from '@/lib/utils';
import type { Todo } from '@/types/types';
import { CircleCheck, Clock4 } from 'lucide-react';
import { useNavigate } from 'react-router';
import HistoryTodoRow from './HistoryTodoRow';

interface DayHistoryCardProps {
  date: string;
  dayTodos: Todo[];
  stats: ReturnType<typeof getDayStats>;
}

export default function DayHistoryCard({
  date,
  dayTodos,
  stats,
}: DayHistoryCardProps) {
  const navigate = useNavigate();

  return (
    <section
      className="flex flex-col gap-3 border-2 rounded-2xl p-5 mb-5 cursor-pointer "
      onClick={() => navigate(`/history/${date}`)}
    >
      <header className="flex justify-between items-center text-lg">
        <div>{date}</div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <CircleCheck />
            {stats.completionRate}%
          </div>
          <div className="flex items-center gap-1 font-mono">
            <Clock4 />
            {formatTime(stats.totalFocusSeconds).fullTimeDisplay}
          </div>
        </div>
      </header>

      <ul className="text-lg">
        {dayTodos.map((todo) => (
          <HistoryTodoRow key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
