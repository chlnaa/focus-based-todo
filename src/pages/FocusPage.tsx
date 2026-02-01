import CustomDurationModal from '@/components/modal/CustomDurationModal';
import { FocusStopModal } from '@/components/modal/FocusStopModal';
import TimerCompletionModal from '@/components/modal/TimerCompletionModal';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/hooks/useTimer';
import { formatTime } from '@/lib/utils';
import { useAddFocusTime, useTodo, useUpdateTodo } from '@/stores/useTodoStore';
import { Play, Square, MoveLeft, Pause } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function FocusPage() {
  const navigate = useNavigate();
  const { todoId } = useParams<{ todoId: string }>();

  const todos = useTodo();
  const currentTodo = todos.find((t) => t.id === todoId);
  const addFocusTime = useAddFocusTime();
  const updateTodoStatus = useUpdateTodo();

  const [isStopModalOpen, setIsStopModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const { status, timeLeft, initialTime, setDuration, togglePlay, stop } =
    useTimer({
      initialSeconds: 1500,
      onComplete: () => setIsCompletionModalOpen(true),
    });

  const { hours, minutes, seconds } = formatTime(timeLeft);

  const handleStopClick = () => {
    stop();
    setIsStopModalOpen(true);
  };

  const handleSaveAndExit = () => {
    if (!todoId || !currentTodo) return;

    const focusedSeconds = initialTime - timeLeft;

    if (focusedSeconds > 0) {
      addFocusTime(todoId, focusedSeconds);

      if (timeLeft === 0 && currentTodo.status !== 'completed') {
        updateTodoStatus(todoId, { status: 'completed' });
      }
    }
    navigate('/');
  };

  if (!currentTodo) return <div>No todo items found</div>;

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-175 mt-5 m-auto ">
      <header className="relative w-full text-center">
        <Button
          className="absolute left-3 top-1"
          variant={'ghost'}
          onClick={handleStopClick}
        >
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
            onClick={() => setDuration(25)}
          >
            00:25
          </Button>
          <Button
            variant={initialTime === 3000 ? 'default' : 'outline'}
            onClick={() => setDuration(50)}
          >
            00:50
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setIsCustomModalOpen(true)}
          >
            Custom
          </Button>
        </div>

        <div className="flex gap-6 items-center">
          <Button className="rounded-full w-15 h-15" onClick={togglePlay}>
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
          {currentTodo.text}
        </div>

        <div className="flex gap-3">
          <div className="text-muted-foreground">Total Focus Time</div>
          <div>{formatTime(currentTodo.totalFocusTime).fullTimeDisplay}</div>
        </div>
      </footer>

      <CustomDurationModal
        open={isCustomModalOpen}
        onOpenChange={setIsCustomModalOpen}
        onSetDuration={(mins) => setDuration(mins)}
      />

      <FocusStopModal
        open={isStopModalOpen}
        onOpenChange={setIsStopModalOpen}
        onConfirm={handleSaveAndExit}
      />

      <TimerCompletionModal
        open={isCompletionModalOpen}
        onConfirm={handleSaveAndExit}
        totalFocusTime={
          formatTime(currentTodo.totalFocusTime + initialTime).fullTimeDisplay
        }
      />
    </div>
  );
}
