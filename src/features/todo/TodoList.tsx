import { useDeleteTodo, useUpdateTodo } from '@/stores/useTodoStore';
import type { Todo } from '@/types/types';
import TodoItems from './TodoItems';

interface TodolistProps {
  filteredTodos: Todo[];
}

export default function TodoList({ filteredTodos }: TodolistProps) {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

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
