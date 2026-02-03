import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

export default function TodayClock() {
  const [now, setNow] = useState(new Date());

  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const hours = now.getHours() % 12 || 12;
  const displayHours = String(hours).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  useInterval(() => {
    setNow(new Date());
  }, 1000);

  return (
    <div className="text-xl font-bold">
      <p>{`${ampm} ${displayHours}:${minutes}`}</p>
    </div>
  );
}
