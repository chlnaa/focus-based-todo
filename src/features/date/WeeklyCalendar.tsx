import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { useWeekNavigation } from '@/hooks/useWeekNavigation';

interface WeeklyCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function WeeklyCalendar({
  selectedDate,
  onDateSelect,
}: WeeklyCalendarProps) {
  const { baseDate, goPrevWeek, goNextWeek, goToday, currentMonth } =
    useWeekNavigation(selectedDate || dayjs(), true);

  const daysInWeek = Array.from({ length: 7 }, (_, i) => {
    const date = baseDate.add(i, 'day');
    const fullDate = date.format('YYYY-MM-DD');
    return {
      dayName: date.format('ddd'),
      dateNumber: date.date(),
      fullDate,
      isSelected: fullDate === selectedDate,
      isToday: fullDate === dayjs().format('YYYY-MM-DD'),
    };
  });

  const handleGoToday = () => {
    goToday();
    onDateSelect(dayjs().format('YYYY-MM-DD'));
  };

  return (
    <section>
      <div className="flex items-center gap-6">
        <div>
          <Button
            className="h-7 p-2 text-xs font-medium border-gray-300"
            variant="outline"
            size="sm"
            onClick={handleGoToday}
          >
            Today
          </Button>
          <Button
            className="cursor-pointer text-xl ml-2"
            variant={'ghost'}
            onClick={goPrevWeek}
          >
            {'<'}
          </Button>
          <Button
            className="cursor-pointer text-xl"
            variant={'ghost'}
            onClick={goNextWeek}
          >
            {'>'}
          </Button>
        </div>
        <h2 className="text-3xl font-bold text-center">{currentMonth}</h2>
      </div>

      <ul className="flex justify-between items-center p-3">
        {daysInWeek.map((day) => (
          <li key={day.fullDate} className="text-center">
            <div>{day.dayName}</div>
            <Button
              className={`text-xl transition-all ${day.isSelected ? 'p-4 text-2xl' : 'text-gray-600'}`}
              variant={day.isSelected ? 'default' : 'ghost'}
              onClick={() => onDateSelect(day.fullDate)}
            >
              {day.dateNumber}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
