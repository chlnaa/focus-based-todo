import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Trash2, Pencil } from 'lucide-react';
import {
  useAddTodo,
  useDeleteTodo,
  useSelectedDate,
  useTodo,
  useToggle,
  useUpdateTodo,
} from '@/stores/useTodoStore';
import type { Todo } from '@/types/types';
import WeeklyCalendar from '@/features/date/WeeklyCalendar';
import MiniDashboard from '@/features/dashboard/MiniDashboard';

export default function TodayPage() {
  const todos = useTodo();
  const addTodo = useAddTodo();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const toggleTodo = useToggle();

  const selectedDate = useSelectedDate();
  const [text, setText] = useState('');

  const filteredTodos = todos.filter((t) => t.date === selectedDate);
  const totalCount = filteredTodos.length;
  const completedCount = filteredTodos.filter(
    (t) => t.status === 'completed',
  ).length;
  const completedRate =
    totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0;
  const totalFocusTimeSec = filteredTodos.reduce(
    (acc, cur) => acc + (cur.totalFocusTime || 0),
    0,
  );
  const formattedFocusTime = formatTime(totalFocusTimeSec);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length === 0) return;

    addTodo(text, selectedDate);
    setText('');
  };

  const handleUpdated = (todo: Todo) => {
    const newStatus = todo.status === 'active' ? 'completed' : 'active';
    updateTodo(todo.id, { status: newStatus });
  };

  return (
    <div className="flex flex-col m-auto w-full max-w-175 mt-7">
      <WeeklyCalendar />
      <MiniDashboard
        formattedFocusTime={formattedFocusTime}
        completedRate={completedRate}
        completedCount={completedCount}
        totalCount={totalCount}
      />

      <section>
        <form
          className="flex items-center my-6 ml-2 w-full gap-2"
          action="submit"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add todo"
          />
          <Button>Add</Button>
        </form>
        <ul className="mt-3 ">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col justify-between items-center p-2 border-2 rounded-xl gap-3 mb-5"
            >
              <div className="flex justify-between items-center w-full">
                <div>
                  <Checkbox
                    checked={todo.status === 'completed'}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <span className="p-2">{todo.text}</span>
                </div>
                <div>
                  <Button variant={'ghost'} onClick={() => handleUpdated(todo)}>
                    <Pencil />
                  </Button>
                  <Button variant={'ghost'} onClick={() => deleteTodo(todo.id)}>
                    <Trash2 />
                  </Button>
                </div>
              </div>
              <div className="flex justify-end items-center w-full">
                <div className="mr-5">
                  {formatTime(todo.totalFocusTime || 0)}
                </div>
                <Button>startFocus</Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const hDisplay = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
  const mDisplay = mins.toString().padStart(2, '0');
  const sDisplay = secs.toString().padStart(2, '0');

  return `${hDisplay}${mDisplay}:${sDisplay}`;
};
