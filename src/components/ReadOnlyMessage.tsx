import dayjs from 'dayjs';

interface ReadOnlyMessageProps {
  selectedDate: string | Date | number;
}

export default function ReadOnlyMessage({
  selectedDate,
}: ReadOnlyMessageProps) {
  const isPast = dayjs(selectedDate).isBefore(dayjs(), 'day');
  const isFuture = dayjs(selectedDate).isAfter(dayjs(), 'day');

  if (!isPast && !isFuture) return null;

  return (
    <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 my-4">
      <p className="text-gray-500 font-medium italic">
        {isPast
          ? '⭐️ You cannot add or edit tasks for past dates.'
          : '⭐️ Future task planning is coming soon! Focus on today.'}
      </p>
    </div>
  );
}
