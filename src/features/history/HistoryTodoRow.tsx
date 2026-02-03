import type { Todo } from '@/types/types';
import { cn, formatTime } from '@/lib/utils';
import { useDeleteTodo, useUpdateTodo } from '@/stores/useTodoStore';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTodoEdit } from '@/hooks/useTodoEdit';
import TodoTextEditor from '@/components/common/TodoTextEditor';
import { AlertModal } from '@/components/modal/AlertModal';

export default function HistoryTodoRow({ todo }: { todo: Todo }) {
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    isEditing,
    editedText,
    setEditedText,
    handleEditClick,
    handleEditSubmit,
    handleKeyDown,
  } = useTodoEdit(todo, updateTodo);

  const { id, status, totalFocusTime } = todo;

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
            {formatTime(totalFocusTime || 0).fullTimeDisplay}
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
