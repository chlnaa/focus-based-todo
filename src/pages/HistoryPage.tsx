import TodoList from '@/features/todo/TodoList';
import { useTodo } from '@/stores/useTodoStore';
import type { Todo } from '@/types/types';

export default function HistoryPage() {
  const todos = useTodo();
  const historyTodos = todos;

  const todosDate = historyTodos.reduce(
    (acc, todo) => {
      const dateKey = todo.date;

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(todo);
      return acc;
    },
    {} as Record<string, Todo[]>,
  );

  const sortedDates = Object.keys(todosDate).sort((a, b) => b.localeCompare(a));

  return (
    <div className="flex flex-col max-w-175 m-auto mt-10 border-2 rounded-2xl p-3">
      <div>{sortedDates}</div>
      <TodoList filteredTodos={historyTodos} variant="flat" />
    </div>
  );
}
