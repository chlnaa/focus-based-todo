import { Clock4, CircleCheck, ListTodo } from 'lucide-react';

interface MiniDashboardProps {
  formattedFocusTime: string;
  completedCount: number;
  completedRate: number;
  totalCount: number;
}

export default function MiniDashboard({
  formattedFocusTime,
  completedRate,
  completedCount,
  totalCount,
}: MiniDashboardProps) {
  return (
    <section className="flex justify-between items-center py-2 px-3 m-3">
      <div>
        <h3>Total Focus Time</h3>
        <div className="flex gap-2">
          <Clock4 />
          <span>{formattedFocusTime || '00:00:00'}</span>
        </div>
      </div>

      <div>
        <h3>Complete Rate</h3>
        <div className="flex gap-2">
          <CircleCheck />
          <span>{`${completedRate}%`}</span>
        </div>
      </div>

      <div>
        <h3>Task Completed</h3>
        <div className="flex gap-2">
          <ListTodo />
          <span>{`${completedCount}/${totalCount}`}</span>
        </div>
      </div>
    </section>
  );
}
