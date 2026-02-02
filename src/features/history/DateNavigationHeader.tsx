import { Button } from '@/components/ui/button';

interface DateNavigationHeaderProps {
  currentMonth: string;
  dateRange?: string;
  isNextDisabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function DateNavigationHeader({
  currentMonth,
  dateRange,
  onPrev,
  onNext,
  isNextDisabled,
}: DateNavigationHeaderProps) {
  return (
    <div className="flex items-center gap-2 select-none">
      {dateRange ? (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onPrev}>
            {'<'}
          </Button>
          <div className="text-sm font-medium">{dateRange}</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={isNextDisabled}
          >
            {'>'}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 select-none">
          <Button variant="ghost" size="icon" onClick={onPrev}>
            {'<'}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext}>
            {'>'}
          </Button>
          <h2 className="text-2xl font-bold">{currentMonth}</h2>
        </div>
      )}
    </div>
  );
}
