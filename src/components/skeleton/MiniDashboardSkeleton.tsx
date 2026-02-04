import { Skeleton } from '@/components/ui/skeleton';

export default function MiniDashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="bg-card rounded-2xl border-2 p-6 shadow-sm flex flex-col items-center gap-3"
          key={index}
        >
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-24" />
        </div>
      ))}
    </div>
  );
}
