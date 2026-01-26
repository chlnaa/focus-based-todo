import {
  useAddTodo,
  useDeleteTodo,
  useSelectedDate,
  useUpdateTodo,
} from '@/stores/useTodoStore';
import type { Todo, TodoListVariant } from '@/types/types';
import AddTodo from './AddTodo';
import TodoItems from './TodoItems';

interface TodoListProps {
  filteredTodos: Todo[];
  variant: TodoListVariant;
}

export default function TodoList({ filteredTodos, variant }: TodoListProps) {
  const selectedDate = useSelectedDate();

  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleAdd = (text: string) => addTodo(text, selectedDate);

  return (
    <section>
      {variant === 'groupedByDate' && <AddTodo onAdd={handleAdd} />}

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
    </section>
  );
}
