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
    <DialogContent className="border-2 rounded-4xl p-10 min-w-175">
      <DialogHeader className="mb-6 text-left">
        <DialogTitle className="text-3xl font-extrabold tracking-tight">
          Daily focus log
        </DialogTitle>
        <DialogDescription className="text-xl text-gray-500 mt-2 font-medium">
          {date}
        </DialogDescription>
      </DialogHeader>

      <div className="mb-10">
        <MiniDashboard
          formattedFocusTime={formattedFocusTime}
          completionRate={completionRate}
          completedCount={completedCount}
          totalCount={totalCount}
        />
      </div>

      <ul className="space-y-4">
        {todosData.map((todo) => (
          <HistoryTodoRow key={todo.id} todo={todo} />
        ))}
      </ul>
    </DialogContent>
  );
}
