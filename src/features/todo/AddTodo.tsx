import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddTodo } from '@/stores/useTodoStore';
import { useState } from 'react';

interface AddTodoProps {
  selectedDate: string;
  disabled: boolean;
}

export default function AddTodo({ selectedDate, disabled }: AddTodoProps) {
  const addTodo = useAddTodo();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) return;
    if (text.trim().length === 0) return;

    addTodo(text.trim(), selectedDate);
    setText('');
  };

  if (disabled) return null;

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New Todo"
      />
      <Button>Add</Button>
    </form>
  );
}
