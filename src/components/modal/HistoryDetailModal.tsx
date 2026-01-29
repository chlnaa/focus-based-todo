import { useTodo } from '@/stores/useTodoStore';
import MiniDashboard from '../../features/dashboard/MiniDashboard';
import HistoryTodoRow from '../../features/history/HistoryTodoRow';
import { useDayDashboard } from '@/hooks/useDayDashboard';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';

interface HistoryDetailModalProps {
  date: string;
}

export default function HistoryDetailModal({ date }: HistoryDetailModalProps) {
  const todos = useTodo();

  const {
    todosData,
    formattedFocusTime,
    completionRate,
    completedCount,
    totalCount,
  } = useDayDashboard(todos, date!);

  return (
    <DialogContent className="border-2 rounded-4xl py-5 px-3">
      <DialogHeader className="flex items-center gap-5 px-5 text-2xl">
        <DialogTitle className="p-5 text-2xl">Daily focus log</DialogTitle>
      </DialogHeader>
      <DialogDescription className="px-5 text-xl">{date}</DialogDescription>
      <MiniDashboard
        formattedFocusTime={formattedFocusTime}
        completionRate={completionRate}
        completedCount={completedCount}
        totalCount={totalCount}
      />
      <ul>
        {todosData.map((todo) => (
          <HistoryTodoRow key={todo.id} todo={todo} />
        ))}
      </ul>
    </DialogContent>
  );
}
