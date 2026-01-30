import { Button } from '@/components/ui/button';

interface HistoryHeaderProps {
  currentMonth: string;
  dateRange: string;
  onPrev: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
}

export default function FocusHistoryHeader({
  currentMonth,
  dateRange,
  onPrev,
  onNext,
  isNextDisabled,
}: HistoryHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 mb-4">
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onPrev}>
            {'<'}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext}>
            {'>'}
          </Button>
          <h2 className="text-3xl font-bold text-center">{currentMonth}</h2>
        </div>
      )}
    </div>
  );
}
