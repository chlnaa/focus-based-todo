import { Skeleton } from '@/components/ui/skeleton';

export function HistorySummarySkeleton() {
  return (
    <div className="w-full h-16 bg-card border-2 rounded-3xl px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-10" />
      </div>
      <div className="flex items-center gap-6">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}
