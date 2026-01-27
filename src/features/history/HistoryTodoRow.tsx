import { cn, formatTime } from '@/lib/utils';
import type { Todo } from '@/types/types';

export default function HistoryTodoRow({ todo }: { todo: Todo }) {
  return (
    <li key={todo.id} className="flex justify-between px-5 py-2">
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
  );
}
