import { AlarmClockCheck } from 'lucide-react';

export default function GlobalLoader() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-muted">
      <div className="flex items-center gap-4 mb-15 animate-bounce">
        <AlarmClockCheck className="w-10 h-10" />
        <div className="text-2xl font-bold">FocusDo</div>
      </div>
    </div>
  );
}
