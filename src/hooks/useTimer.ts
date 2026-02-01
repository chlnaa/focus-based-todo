import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

interface UseTimerProps {
  initialSeconds: number;
  onComplete: () => void;
}

export const useTimer = ({ initialSeconds, onComplete }: UseTimerProps) => {
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [currentInitialTime, setCurrentInitialTime] = useState(initialSeconds);

  const setDuration = (minutes: number) => {
    const seconds = minutes * 60;
    setStatus('idle');
    setTimeLeft(seconds);
    setCurrentInitialTime(seconds);
  };

  const togglePlay = () => {
    setStatus((prev) => (prev === 'running' ? 'paused' : 'running'));
  };

  const stop = () => setStatus('paused');

  useInterval(
    () => {
      if (timeLeft > 0) {
        const nextTime = timeLeft - 1;
        setTimeLeft(nextTime);

        if (nextTime === 0) {
          setStatus('completed');
          onComplete();
        }
      }
    },
    status === 'running' ? 1000 : null,
  );

  return {
    status,
    timeLeft,
    initialTime: currentInitialTime,
    setDuration,
    togglePlay,
    stop,
    setTimeLeft,
  };
};
