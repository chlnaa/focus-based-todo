import { Button } from '@/components/ui/button';
import { Play, Square, MoveLeft, Pause } from 'lucide-react';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

type TimerStatus = 'idle' | 'running' | 'paused';

export default function FocusPage() {
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(1500);
  const [initialTime, setInitialTime] = useState(1500);

  const { hours, minutes, seconds } = formatTimer(timeLeft);

  const handlePreset = (minutes: number) => {
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setInitialTime(seconds);
    setStatus('idle');
  };

  const handlePlayClick = () => {
    if (status === 'running') {
      setStatus('paused');
    } else {
      setStatus('running');
    }
  };

  const handleStopClick = () => {
    setStatus('idle');
    setTimeLeft(initialTime);
  };

  useInterval(
    () => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      } else {
        setStatus('idle');
      }
    },
    status === 'running' ? 1000 : null,
  );

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-175 mt-5 m-auto ">
      <header className="relative w-full text-center">
        <Button variant={'ghost'} className="absolute left-3 top-1">
          <MoveLeft />
        </Button>
        <h1 className="text-3xl font-bold">Deep Focus</h1>
      </header>
      <main className="flex flex-col items-center justify-center gap-5 ">
        <div className="flex items-center justify-center text-5xl border-2 rounded-full w-85 h-85 font-mono mt-5 ">
          <div className="flex items-baseline">
            <span>{hours}</span>
            <span className="text-sm text-muted-foreground">h</span>
            <span className="text-muted-foreground">:</span>
            <span>{minutes}</span>
            <span className="text-sm text-muted-foreground">m</span>
            <span className="text-muted-foreground">:</span>
            <span>{seconds}</span>
            <span className="text-sm text-muted-foreground">s</span>
          </div>
        </div>

        <div className="flex gap-3 p-2">
          <Button
            variant={initialTime === 1500 ? 'default' : 'outline'}
            onClick={() => handlePreset(25)}
          >
            00:25
          </Button>
          <Button
            variant={initialTime === 3000 ? 'default' : 'outline'}
            onClick={() => handlePreset(50)}
          >
            00:50
          </Button>
          <Button variant={'outline'}>Custom</Button>
        </div>
        <div className="flex gap-6 items-center">
          <Button className="rounded-full w-15 h-15" onClick={handlePlayClick}>
            {status === 'running' ? <Pause /> : <Play />}
          </Button>
          <Button
            className="rounded-full w-15 h-15"
            variant={'outline'}
            onClick={handleStopClick}
          >
            <Square />
          </Button>
        </div>
      </main>
      <footer className="flex flex-col items-center justify-start my-4 gap-8">
        <div className="text-xl bg-muted px-5 py-2 rounded-3xl">
          Study to React ts
        </div>

        <div className="flex gap-3">
          <div className="text-muted-foreground">Total Focus Time</div>
          <div>00:00:00</div>
        </div>
      </footer>
    </div>
  );
}

function formatTimer(setTime: number) {
  const pad = (n: number) => n.toString().padStart(2, '0');

  const hours = pad(Math.floor(setTime / 3600));
  const minutes = pad(Math.floor((setTime % 3600) / 60));
  const seconds = pad(setTime % 60);

  return { hours, minutes, seconds };
}
