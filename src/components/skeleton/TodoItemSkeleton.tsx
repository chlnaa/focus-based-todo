import { Skeleton } from '@/components/ui/skeleton';

export function TodoItemSkeleton() {
  return (
    <div className="w-full h-32 bg-card border-2 rounded-xl p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-40 h-5" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="w-10 h-5 rounded" />
          <Skeleton className="w-10 h-5 rounded" />
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-24 h-9 rounded-lg" />
      </div>
    </div>
  );
}
