import type { Todo } from '@/types/types';
import { cn, formatTime } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import useTodoEdit from '@/hooks/useTodoEdit';
import TodoTextEditor from '@/components/common/TodoTextEditor';
import AlertModal from '@/components/modal/AlertModal';
import useDeleteTodo from '@/hooks/mutations/todo/useDeleteTodo';
import useUpdateTodo from '@/hooks/mutations/todo/useUpdateTodo';
import useTodoFocusTime from '@/hooks/queries/focus/useTodoFocusTime';
import { useSession } from '@/stores/session';

interface HistoryTodoRowProps {
  todo: Todo;
}

export default function HistoryTodoRow({ todo }: HistoryTodoRowProps) {
  const session = useSession();
  const userId = session?.user.id;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const {
    isEditing,
    editedText,
    setEditedText,
    handleEditClick,
    handleEditSubmit,
    handleKeyDown,
  } = useTodoEdit({ todo, onUpdate: updateTodo });

  const { id, status } = todo;
  const { data: focusTime = 0 } = useTodoFocusTime(userId, todo.id);

  return (
    <li key={id} className="flex justify-between items-center px-5 py-2">
      <div className={cn(status === 'completed' ? 'text-gray-500' : '')}>
        <TodoTextEditor
          todo={todo}
          isEditing={isEditing}
          editedText={editedText}
          setEditedText={setEditedText}
          handleKeyDown={handleKeyDown}
          handleEditSubmit={handleEditSubmit}
        />

        {!isEditing && (
          <span className="ml-3 font-mono text-sm">
            {formatTime(focusTime).fullTimeDisplay}
          </span>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon'} className="h-8 w-8">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onSelect={handleEditClick}>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowDeleteModal(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={() => deleteTodo(id)}
      />
    </li>
  );
}
