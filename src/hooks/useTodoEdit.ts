import type { Todo } from '@/types/types';
import { useState } from 'react';

export const useTodoEdit = (
  todo: Todo,
  onUpdate: (id: string, updates: Partial<Todo>) => void,
) => {
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
};
