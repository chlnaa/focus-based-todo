import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { useWeekNavigation } from '@/hooks/useWeekNavigation';
import DateNavigationHeader from '../history/DateNavigationHeader';
import TodayClock from './TodayClock';

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            className="h-7 p-2 text-xs font-medium border-gray-300"
            variant="outline"
            size="sm"
            onClick={handleGoToday}
          >
            Today
          </Button>

          <DateNavigationHeader
            currentMonth={currentMonth}
            onPrev={goPrevWeek}
            onNext={goNextWeek}
          />
        </div>
        <div className="mr-3">
          <TodayClock />
        </div>
      </div>

      <ul className="flex justify-between items-center px-2 py-3 sm:p-3">
        {daysInWeek.map((day) => (
          <li key={day.fullDate} className="text-center">
            <div className="text-sm sm:text-xl ">{day.dayName}</div>
            <Button
              className={`text-lg sm:text-xl transition-all ${day.isSelected ? 'p-3 sm:p-4 text-xl sm:text-2xl' : 'text-gray-600'}`}
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
