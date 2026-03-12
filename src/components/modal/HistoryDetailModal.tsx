import MiniDashboard from '../../features/dashboard/MiniDashboard';
import HistoryTodoRow from '../../features/history/HistoryTodoRow';
import useDayDashboard from '@/hooks/useDayDashboard';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useSession } from '@/stores/session';
import useHistoryTodos from '@/hooks/queries/todo/useHistoryTodos';
import useTodayFocusTime from '@/hooks/queries/focus/useTodayFocusTime';

interface HistoryDetailModalProps {
  date: string;
}

export default function HistoryDetailModal({ date }: HistoryDetailModalProps) {
  const session = useSession();
  const userId = session?.user.id;

  const { data: todos = [] } = useHistoryTodos(date!, userId);
  const { data: focusSeconds = 0 } = useTodayFocusTime(userId ?? '', date);

  const { formattedFocusTime, completionRate, completedCount, totalCount } =
    useDayDashboard({ todos, totalFocusSeconds: focusSeconds });

  return (
    <DialogContent className="max-w-[90vw] md:max-w-2xl w-full max-h-[85vh] overflow-y-auto border-2 rounded-4xl p-4 sm:p-8 ">
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
        {todos.map((todo) => (
          <HistoryTodoRow key={todo.id} todo={todo} />
        ))}
      </ul>
    </DialogContent>
  );
}
