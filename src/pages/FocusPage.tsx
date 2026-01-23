import { Button } from '@/components/ui/button';
import { Play, Square, MoveLeft } from 'lucide-react';

export default function FocusPage() {
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
            <span>00</span>
            <span className="text-sm text-muted-foreground">h</span>
            <span className="text-muted-foreground">:</span>
            <span>00</span>
            <span className="text-sm text-muted-foreground">m</span>
            <span className="text-muted-foreground">:</span>
            <span>00</span>
            <span className="text-sm text-muted-foreground">s</span>
          </div>
        </div>

        <div className="flex gap-3 p-2">
          <Button variant={'outline'}>00:25</Button>
          <Button variant={'outline'}>00:50</Button>
          <Button variant={'outline'}>Custom</Button>
        </div>
        <div className="flex gap-6 items-center">
          <Button className="rounded-full w-15 h-15">
            <Play />
          </Button>
          <Button variant={'outline'} className="rounded-full w-15 h-15">
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
