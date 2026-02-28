import type { Todo } from '@/types/types';
import TodoItems from './TodoItems';
import { useDeleteTodo } from '@/hooks/mutations/todo/useDeleteTodo';
import { useUpdateTodo } from '@/hooks/mutations/todo/useUpdateTodo';

interface TodolistProps {
  filteredTodos: Todo[];
}

export default function TodoList({ filteredTodos }: TodolistProps) {
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

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
