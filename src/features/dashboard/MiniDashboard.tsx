import { Clock4, CircleCheck, ListTodo } from 'lucide-react';

interface MiniDashboardProps {
  formattedFocusTime: string;
  completedCount: number;
  completionRate: number;
  totalCount: number;
}

export default function MiniDashboard({
  formattedFocusTime,
  completionRate: completionRate,
  completedCount,
  totalCount,
}: MiniDashboardProps) {
  return (
    <section className="flex justify-between items-center select-none w-full gap-4">
      <div className="flex-1 border-2 px-6 py-3 rounded-2xl">
        <h3 className="text-sm font-semibold text-gray-500">
          Total Focus Time
        </h3>
        <div className="flex items-center gap-2 pt-4">
          <Clock4 className="w-5 h-5" />
          <span className="text-xl font-bold">
            {formattedFocusTime || '00:00:00'}
          </span>
        </div>
      </div>

      <div className="flex-1  border-2 px-6 py-4 rounded-2xl">
        <h3 className="text-sm font-semibold text-gray-500">Complete Rate</h3>
        <div className="flex items-center gap-2 pt-2">
          <CircleCheck className="w-5 h-5" />
          <span className="text-xl font-bold">{`${completionRate}%`}</span>
        </div>
      </div>

      <div className="flex-1  border-2 px-6 py-4 rounded-2xl">
        <h3 className="text-sm font-semibold text-gray-500">Task Completed</h3>
        <div className="flex items-center gap-2 pt-2">
          <ListTodo className="w-5 h-5" />
          <span className="text-xl font-bold">{`${completedCount}/${totalCount}`}</span>
        </div>
      </div>
    </section>
  );
}
