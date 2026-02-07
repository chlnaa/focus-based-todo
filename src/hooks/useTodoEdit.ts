import type { Todo } from '@/types/types';
import { useState } from 'react';

interface UseTodoEditProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
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
    onUpdate(todo.id, { text: trimmed });
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
