import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn, formatTime, isToday } from '@/lib/utils';
import type { Todo } from '@/types/types';
import { Pencil, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router';
import AlertModal from '@/components/modal/AlertModal';
import TodoTextEditor from '@/components/common/TodoTextEditor';
import useTodoEdit from '@/hooks/useTodoEdit';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (payload: {
    id: string;
    updates: Partial<Todo>;
    date: string;
  }) => void;
}

export default function TodoItems({ todo, onDelete, onUpdate }: TodoItemProps) {
  const navigate = useNavigate();

  const { id, status, total_focus_time, date } = todo;

  const isReadOnly = !isToday(date);

  const handleToggle = (checked: boolean) => {
    if (isReadOnly) return;
    onUpdate({
      id,
      updates: {
        status: checked ? 'completed' : 'active',
      },
      date: todo.date,
    });
  };

  const [showModal, setShowModal] = useState(false);
  const openDeleteModal = () => setShowModal(true);
  const confirmDelete = () => {
    onDelete(id);
    setShowModal(false);
  };

  const {
    isEditing,
    editedText,
    setEditedText,
    handleEditClick,
    handleEditSubmit,
    handleKeyDown,
  } = useTodoEdit({ todo, onUpdate });

  return (
    <li
      key={todo.id}
      className={cn(
        'flex flex-col justify-between items-center p-2 border-2 rounded-xl gap-4 mb-5',
        todo.status === 'completed' && 'opacity-60 grayscale[0.5]',
        isReadOnly && 'text-muted-foreground',
      )}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center flex-1 gap-2">
          <Checkbox
            checked={status === 'completed'}
            onCheckedChange={handleToggle}
            disabled={isReadOnly}
          />
          <TodoTextEditor
            todo={todo}
            isEditing={isEditing}
            editedText={editedText}
            setEditedText={setEditedText}
            handleKeyDown={handleKeyDown}
            handleEditSubmit={handleEditSubmit}
          />
        </div>
        <div>
          <Button
            variant={'ghost'}
            onClick={handleEditClick}
            disabled={todo.status === 'completed' || isReadOnly}
          >
            <Pencil />
          </Button>

          <Button
            variant={'ghost'}
            onClick={openDeleteModal}
            disabled={todo.status === 'completed' || isReadOnly}
          >
            <Trash2 />
          </Button>

          <AlertModal
            open={showModal}
            onOpenChange={setShowModal}
            onConfirm={confirmDelete}
          />
        </div>
      </div>
      <div className="flex justify-end items-center w-full">
        <div className="mr-5">
          {formatTime(total_focus_time || 0).fullTimeDisplay}
        </div>
        <Button
          onClick={() => navigate(`/focus/${id}`)}
          disabled={todo.status === 'completed' || isReadOnly}
        >
          startFocus
        </Button>
      </div>
    </li>
  );
}
