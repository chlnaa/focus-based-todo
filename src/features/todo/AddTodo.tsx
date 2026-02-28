import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateTodo } from '@/hooks/mutations/todo/useCreateTodo';
import { useSession } from '@/stores/session';
import { useState } from 'react';

interface AddTodoProps {
  selectedDate: string;
  disabled: boolean;
}

export default function AddTodo({ selectedDate, disabled }: AddTodoProps) {
  const session = useSession();
  const [text, setText] = useState('');

  const { mutate: createTodo, isPending: isCreateTodoPending } = useCreateTodo({
    onSuccess: () => setText(''),
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) return;
    if (text.trim().length === 0) return;

    createTodo({
      text: text.trim(),
      date: selectedDate,
      user_id: session!.user.id,
    });
  };

  if (disabled) return null;

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isCreateTodoPending}
        placeholder="New Todo"
      />
      <Button disabled={isCreateTodoPending}>Add</Button>
    </form>
  );
}
