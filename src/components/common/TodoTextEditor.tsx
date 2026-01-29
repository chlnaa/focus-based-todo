import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import type { Todo } from '@/types/types';

interface TodoTextEditorProps {
  todo: Todo;
  isEditing: boolean;
  editedText: string;
  setEditedText: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleEditSubmit: () => void;
}

export default function TodoTextEditor({
  todo,
  isEditing,
  editedText,
  setEditedText,
  handleKeyDown,
  handleEditSubmit,
}: TodoTextEditorProps) {
  const { id, text, status } = todo;

  return (
    <>
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
            status === 'completed' && 'line-through text-muted-foreground',
          )}
          id={id}
        >
          {text}
        </label>
      )}
    </>
  );
}
