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
    <section className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 select-none">
      <div className="px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-2xl">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-500">
          Total Focus Time
        </h3>
        <div className="flex items-center gap-2 pt-2">
          <Clock4 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-lg sm:text-xl font-bold">
            {formattedFocusTime || '00:00:00'}
          </span>
        </div>
      </div>

      <div className="px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-2xl">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-500">
          Complete Rate
        </h3>
        <div className="flex items-center gap-2 pt-2">
          <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-lg sm:text-xl font-bold">{`${completionRate}%`}</span>
        </div>
      </div>

      <div className="px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-2xl">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-500">
          Task Completed
        </h3>
        <div className="flex items-center gap-2 pt-2">
          <ListTodo className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-lg sm:text-xl font-bold">{`${completedCount}/${totalCount}`}</span>
        </div>
      </div>
    </section>
  );
}
