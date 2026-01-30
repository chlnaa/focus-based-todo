import { prepareChartData } from '@/features/history/chart-utils';
import DayHistoryCard from '@/features/history/DayHistoryCard';
import FocusTrendChart from '@/features/history/FocusTrendChart';
import { getDayStats } from '@/lib/utils';
import { useTodo } from '@/stores/useTodoStore';
import type { Todo } from '@/types/types';
import { useMemo } from 'react';

export default function FocusHistoryPage() {
  const historyTodos = useTodo();

  const todosByDate = useMemo(
    () => groupTodosByDate(historyTodos),
    [historyTodos],
  );

  const sortedDates = useMemo(
    () => Object.keys(todosByDate).sort((a, b) => b.localeCompare(a)),
    [todosByDate],
  );

  const chartData = useMemo(() => prepareChartData(todosByDate), [todosByDate]);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-3xl font-semibold">Focus History</h1>
      <FocusTrendChart data={chartData} />

      {sortedDates.map((date) => (
        <DayHistoryCard
          key={date}
          date={date}
          dayTodos={todosByDate[date]}
          stats={getDayStats(todosByDate[date])}
        />
      ))}
    </div>
  );
}

const groupTodosByDate = (todos: Todo[]): Record<string, Todo[]> =>
  todos.reduce(
    (acc, todo) => {
      const dateKey = todo.date;
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(todo);
      return acc;
    },
    {} as Record<string, Todo[]>,
  );
