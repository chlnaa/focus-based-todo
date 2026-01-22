import { useSelectedDate, useSetSelectedDate } from '@/stores/useTodoStore';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function WeeklyCalendar() {
  const setSelectedDate = useSetSelectedDate();
  const selectedDate = useSelectedDate();

  const [viewDate, setViewDate] = useState(dayjs(selectedDate));

  const currentMonth = viewDate.format('MMM');
  const startOfWeek = viewDate.startOf('week');

  const daysInWeek = Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, 'day');
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
    const today = dayjs();
    setViewDate(today);
    setSelectedDate(today.format('YYYY-MM-DD'));
  };

  const handleGoPrevWeek = () =>
    setViewDate((prev) => prev.subtract(1, 'week'));

  const handleGoNextWeek = () => setViewDate((prev) => prev.add(1, 'week'));

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
            onClick={handleGoPrevWeek}
          >
            {'<'}
          </Button>
          <Button
            className="cursor-pointer text-xl"
            variant={'ghost'}
            onClick={handleGoNextWeek}
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
              onClick={() => setSelectedDate(day.fullDate)}
            >
              {day.dateNumber}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
