import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInterval } from 'usehooks-ts';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

const STORAGE_KEY = 'focus_timer_state';

interface StoredTimerState {
  todoId: string;
  status: TimerStatus;
  currentInitialTime: number;
  pausedElapsedSeconds: number;
  runningStartedAt: number | null;
}

interface UseTimerProps {
  initialSeconds: number;
  todoId: string;
  onComplete: (elapsedSeconds: number) => void;
}

function loadStoredState(todoId: string): StoredTimerState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: StoredTimerState = JSON.parse(raw);
    if (parsed.todoId !== todoId) return null;
    if (parsed.status === 'completed') return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state: StoredTimerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function useTimer({
  initialSeconds,
  todoId,
  onComplete,
}: UseTimerProps) {
  const stored = useMemo(() => loadStoredState(todoId), [todoId]);

  const [status, setStatus] = useState<TimerStatus>(stored?.status ?? 'idle');
  const [currentInitialTime, setCurrentInitialTime] = useState(
    stored?.currentInitialTime ?? initialSeconds,
  );

  const restoredElapsed = useMemo(() => {
    if (!stored) return 0;
    if (stored.status === 'running' && stored.runningStartedAt !== null) {
      return (
        stored.pausedElapsedSeconds +
        Math.floor((Date.now() - stored.runningStartedAt) / 1000)
      );
    }
    return stored.pausedElapsedSeconds;
  }, [stored]);

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!stored) return initialSeconds;
    const remaining = stored.currentInitialTime - restoredElapsed;
    return Math.max(remaining, 0);
  });

  const startTimeRef = useRef<number | null>(
    stored?.status === 'running' ? Date.now() : null,
  );
  const pausedElapsedRef = useRef(
    stored?.status === 'running'
      ? restoredElapsed
      : (stored?.pausedElapsedSeconds ?? 0),
  );

  const persistState = useCallback(() => {
    const state: StoredTimerState = {
      todoId,
      status,
      currentInitialTime,
      pausedElapsedSeconds: pausedElapsedRef.current,
      runningStartedAt: startTimeRef.current,
    };
    saveState(state);
  }, [todoId, status, currentInitialTime]);

  const setDuration = (minutes: number) => {
    const seconds = minutes * 60;
    setStatus('idle');
    setTimeLeft(seconds);
    setCurrentInitialTime(seconds);
    startTimeRef.current = null;
    pausedElapsedRef.current = 0;
    clearState();
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

    persistState();
  }, [status, persistState]);

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
        clearState();
        onComplete(totalElapsed);
        return;
      }

      setTimeLeft(remaining);
      persistState();
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
