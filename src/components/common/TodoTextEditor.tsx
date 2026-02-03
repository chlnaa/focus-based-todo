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
  const { id, text } = todo;

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
        <label className={'p-2 text-xl'} id={id}>
          {text}
        </label>
      )}
    </>
  );
}
