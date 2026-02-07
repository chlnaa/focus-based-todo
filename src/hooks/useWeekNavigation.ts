import dayjs from 'dayjs';

interface UseWeekNavigationProps {
  currentDate: string | Date | dayjs.Dayjs;
  allowFuture?: boolean;
}

export default function useWeekNavigation({
  currentDate,
  allowFuture = false,
}: UseWeekNavigationProps) {
  const date = dayjs(currentDate);

  const getTodayDate = () => dayjs().format('YYYY-MM-DD');
  const getPrevWeekDate = () => date.subtract(1, 'week').format('YYYY-MM-DD');
  const getNextWeekDate = () => {
    const next = date.add(1, 'week');
    if (!allowFuture && next.isAfter(dayjs(), 'week')) return;
    return next.format('YYYY-MM-DD');
  };

  return {
    baseDate: date.startOf('week'),
    currentMonth: date.format('YYYY-MM'),
    getTodayDate,
    getPrevWeekDate,
    getNextWeekDate,
  };
}
