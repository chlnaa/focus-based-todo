import { useEffect, useRef, useState } from 'react';
import { useInterval } from 'usehooks-ts';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

interface UseTimerProps {
  initialSeconds: number;
  onComplete: (elapsedSeconds: number) => void;
}

export default function useTimer({
  initialSeconds,
  onComplete,
}: UseTimerProps) {
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [currentInitialTime, setCurrentInitialTime] = useState(initialSeconds);
  const startTimeRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef(0);

  const setDuration = (minutes: number) => {
    const seconds = minutes * 60;
    setStatus('idle');
    setTimeLeft(seconds);
    setCurrentInitialTime(seconds);

    startTimeRef.current = null;
    pausedElapsedRef.current = 0;
  };

  const togglePlay = () =>
    setStatus((prev) => (prev === 'running' ? 'paused' : 'running'));
  const stop = () => setStatus('paused');
  const resume = () => setStatus('running');

  useEffect(() => {
    if (status === 'running' && startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }

    if (status === 'paused' && startTimeRef.current !== null) {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);

      pausedElapsedRef.current += elapsed;
      startTimeRef.current = null;
    }
  }, [status]);

  useInterval(
    () => {
      if (!startTimeRef.current) return;

      const totalElapsed =
        pausedElapsedRef.current +
        Math.floor((Date.now() - startTimeRef.current) / 1000);

      const remaining = currentInitialTime - totalElapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        setStatus('completed');
        onComplete(totalElapsed);
        return;
      }

      setTimeLeft(remaining);
    },
    status === 'running' ? 1000 : null,
  );

  return {
    status,
    timeLeft,
    initialTime: currentInitialTime,
    setDuration,
    togglePlay,
    resume,
    stop,
    setTimeLeft,
  };
}
