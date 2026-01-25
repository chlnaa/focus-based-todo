import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn, formatTime } from '@/lib/utils';
import { useToggleTodo } from '@/stores/useTodoStore';
import type { Todo } from '@/types/types';
import { Pencil, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

export default function TodoItems({ todo, onDelete, onUpdate }: TodoItemProps) {
  const navigate = useNavigate();

  const { id, text, status, totalFocusTime } = todo;
  const toggleTodoStatus = useToggleTodo();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleToggle = () => toggleTodoStatus(id);
  const handleDelete = () => onDelete(id);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedText(text);
  };
  const handleEditSubmit = () => {
    if (!editedText.trim()) {
      setIsEditing(false);
      return;
    }
    onUpdate(id, { text: editedText.trim() });
    setIsEditing(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') setIsEditing(false);
  };

  return (
    <li
      key={todo.id}
      className={cn(
        'flex flex-col justify-between items-center p-2 border-2 rounded-xl gap-4 mb-5',
        todo.status === 'completed' && 'opacity-60 grayscale[0.5]',
      )}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center flex-1 gap-2">
          <Checkbox
            checked={status === 'completed'}
            onCheckedChange={handleToggle}
          />
          {isEditing ? (
            <Input
              className="p-2"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleEditSubmit}
              autoFocus
            />
          ) : (
            <label
              className={cn(
                'p-2 text-xl',
                todo.status === 'completed' &&
                  'line-through text-muted-foreground',
              )}
              id={id}
            >
              {text}
            </label>
          )}
        </div>
        <div>
          <Button
            variant={'ghost'}
            onClick={handleEditClick}
            disabled={todo.status === 'completed'}
          >
            <Pencil />
          </Button>
          <Button
            variant={'ghost'}
            onClick={handleDelete}
            disabled={todo.status === 'completed'}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      <div className="flex justify-end items-center w-full">
        <div className="mr-5">
          {formatTime(totalFocusTime || 0).fullTimeDisplay}
        </div>
        <Button
          onClick={() => navigate(`/focus/${id}`)}
          disabled={todo.status === 'completed'}
        >
          startFocus
        </Button>
      </div>
    </li>
  );
}
