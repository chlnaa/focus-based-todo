import { useState } from 'react';
import dayjs from 'dayjs';

export function useWeekNavigation(
  initialDate: string | Date | dayjs.Dayjs,
  allowFuture = false,
) {
  const [viewDate, setViewDate] = useState(dayjs(initialDate));

  const goPrevWeek = () => setViewDate((prev) => prev.subtract(1, 'week'));

  const goNextWeek = () => {
    const next = viewDate.add(1, 'week');
    if (!allowFuture && next.isAfter(dayjs(), 'week')) return;
    setViewDate(next);
  };

  const goToday = () => setViewDate(dayjs());

  return {
    viewDate,
    baseDate: viewDate.startOf('week'),
    currentMonth: viewDate.format('YYYY-MM'),
    goPrevWeek,
    goNextWeek,
    goToday,
  };
}
