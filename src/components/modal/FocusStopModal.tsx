import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface FocusStopModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function FocusStopModal({
  open,
  onOpenChange,
  onConfirm,
}: FocusStopModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>Stop Focusing?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to stop? Your progress will be saved, and you
          will be returned to the home screen.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Going</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Yes, Stop Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
