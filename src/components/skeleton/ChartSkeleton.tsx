import { Skeleton } from '@/components/ui/skeleton';

interface ChartSkeletonProps {
  type: 'line' | 'bar';
}

export function ChartSkeleton({ type }: ChartSkeletonProps) {
  return (
    <div className="w-full h-40 bg-card border-2 rounded-xl p-4 flex flex-col gap-4">
      <Skeleton className="h-5 w-40" />

      <div className="flex-1 flex items-end gap-2 px-2 border-b border-l border-muted/30">
        {type === 'bar' ? (
          <>
            <Skeleton className="flex-1 h-2/5 rounded-t-sm rounded-b-none" />
            <Skeleton className="flex-1 h-4/5 rounded-t-sm rounded-b-none" />
            <Skeleton className="flex-1 h-3/5 rounded-t-sm rounded-b-none" />
            <Skeleton className="flex-1 h-5/6 rounded-t-sm rounded-b-none" />
            <Skeleton className="flex-1 h-1/2 rounded-t-sm rounded-b-none" />
          </>
        ) : (
          <Skeleton className="w-full h-px" />
        )}
      </div>
    </div>
  );
}
