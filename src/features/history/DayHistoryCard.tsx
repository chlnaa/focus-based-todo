import HistoryDetailModal from '@/components/modal/HistoryDetailModal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { formatTime } from '@/lib/utils';
import type { HistoryStat } from '@/types/types';
import { CircleCheck, Clock4 } from 'lucide-react';

interface DayHistoryCardProps {
  date: string;
  stats: HistoryStat;
}

export default function DayHistoryCard({
  date,

  stats,
}: DayHistoryCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <section className="flex flex-col border-2 rounded-2xl p-5 cursor-pointer ">
          <header className="flex justify-between items-center text-lg">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono">{date}</span>
              <span className="text-sm text-muted-foreground font-medium">{`(${stats.completedCount}/${stats.totalCount})`}</span>
            </div>
            <div className="flex items-center gap-6 font-mono font-semibold">
              <div className="flex items-center gap-1.5 ">
                <CircleCheck className="w-4 h-4" />
                {stats.completionRate}%
              </div>
              <div className="flex items-center gap-1.5">
                <Clock4 className="w-4 h-4" />
                {formatTime(stats.totalSeconds).fullTimeDisplay}
              </div>
            </div>
          </header>
        </section>
      </DialogTrigger>

      <HistoryDetailModal date={date} />
    </Dialog>
  );
}
