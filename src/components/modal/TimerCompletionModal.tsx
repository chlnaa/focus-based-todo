import { DialogDescription } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';

interface TimerCompletionModalProps {
  open: boolean;
  onConfirm: () => void;
  totalFocusDisplay: string;
}

export default function TimerCompletionModal({
  open,
  onConfirm,
  totalFocusDisplay,
}: TimerCompletionModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Focus Complete!⭐️
          </DialogTitle>
          <DialogDescription className="text-center pt-4 text-lg">
            You’ve completed **{totalFocusDisplay}** of deep work. Ready to save
            and head back?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center sm:justify-center gap-2 pt-4">
          <Button className="w-full" variant="default" onClick={onConfirm}>
            Save & Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
