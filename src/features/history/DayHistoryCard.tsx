import { cn, formatTime, getDayStats } from '@/lib/utils';
import type { Todo } from '@/types/types';
import { CircleCheck, Clock4 } from 'lucide-react';

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
  return (
    <section className="border-2 rounded-2xl p-5 flex flex-col gap-3">
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
          <li key={todo.id} className="flex justify-between py-1">
            <div
              className={cn(
                todo.status === 'completed' ? 'text-gray-500 line-through' : '',
              )}
            >
              {todo.text}
            </div>
            <div
              className={cn(
                todo.status === 'completed'
                  ? 'text-gray-500 line-through text-sm '
                  : 'text-muted-foreground font-mono text-sm ',
              )}
            >
              {formatTime(todo.totalFocusTime || 0).fullTimeDisplay}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
