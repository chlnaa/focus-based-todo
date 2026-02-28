import type { Todo } from '@/types/types';
import { useState } from 'react';

interface UseTodoEditProps {
  todo: Todo;
  onUpdate: (payload: {
    id: string;
    updates: Partial<Todo>;
    date: string;
  }) => void;
}

export default function useTodoEdit({ todo, onUpdate }: UseTodoEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedText(todo.text);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedText(todo.text);
  };

  const handleEditSubmit = () => {
    const trimmed = editedText.trim();
    if (!trimmed || trimmed === todo.text) {
      handleEditCancel();
      return;
    }
    onUpdate({
      id: todo.id,
      updates: { text: trimmed },
      date: todo.date,
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') handleEditCancel();
  };

  return {
    isEditing,
    editedText,
    setEditedText,
    handleEditClick,
    handleEditSubmit,
    handleKeyDown,
    handleEditCancel,
  };
}
