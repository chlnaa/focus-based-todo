import type { Todo } from '@/types/types';
import { cn, formatTime } from '@/lib/utils';
import { useDeleteTodo } from '@/stores/useTodoStore';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HistoryTodoRow({ todo }: { todo: Todo }) {
  const deleteTodo = useDeleteTodo();

  return (
    <li key={todo.id} className="flex justify-between items-center px-5 py-2">
      <div
        className={cn(
          todo.status === 'completed' ? 'text-gray-500 line-through' : '',
        )}
      >
        <span>{todo.text}</span>
        <span className="ml-3 font-mono text-sm">
          {formatTime(todo.totalFocusTime || 0).fullTimeDisplay}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={'ghost'} size={'icon'} className="h-8 w-8">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteTodo(todo.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
