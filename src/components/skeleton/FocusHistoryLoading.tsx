import { ChartSkeleton } from './ChartSkeleton';
import { HistorySummarySkeleton } from './HistorySummarySkeleton';

export default function FocusHistoryLoading() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-3xl font-semibold">Focus History</h1>

      <div className="flex flex-col items-center justify-center gap-6 bg-muted/30 p-4 rounded-xl">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="flex items-center gap-5">
          <ChartSkeleton type="line" />
          <ChartSkeleton type="bar" />
        </div>
      </div>

      <HistorySummarySkeleton />
    </div>
  );
}
