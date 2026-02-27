import type { Todo } from '@/types/types';
import TodoItems from './TodoItems';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteTodo } from '@/hooks/mutations/todo/useDeleteTodo';
import { useUpdateTodo } from '@/hooks/mutations/todo/useUpdateTodo';
import { useSelectedDate } from '@/stores/useTodoStore';

interface TodolistProps {
  filteredTodos: Todo[];
}

export default function TodoList({ filteredTodos }: TodolistProps) {
  const queryClient = useQueryClient();
  const selectedDate = useSelectedDate();

  const { mutate: deleteTodo } = useDeleteTodo({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo', selectedDate] });
    },
  });
  const { mutate: updateTodo } = useUpdateTodo({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo', selectedDate] });
    },
  });

  return (
    <ul className="mt-3 ">
      {filteredTodos.map((todo) => (
        <TodoItems
          key={todo.id}
          todo={todo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      ))}
    </ul>
  );
}
