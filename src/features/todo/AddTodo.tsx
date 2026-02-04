import ReadOnlyMessage from '@/components/ReadOnlyMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isToday } from '@/lib/utils';
import { useAddTodo } from '@/stores/useTodoStore';
import { useState } from 'react';

interface AddTodoProps {
  selectedDate: string;
}

export default function AddTodo({ selectedDate }: AddTodoProps) {
  const addTodo = useAddTodo();
  const isNotToday = !isToday(selectedDate);

  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length === 0) return;

    addTodo(text.trim(), selectedDate);
    setText('');
  };

  return (
    <div>
      {isNotToday ? (
        <ReadOnlyMessage selectedDate={selectedDate} />
      ) : (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New Todo"
            autoFocus
          />
          <Button>Add</Button>
        </form>
      )}
    </div>
  );
}
