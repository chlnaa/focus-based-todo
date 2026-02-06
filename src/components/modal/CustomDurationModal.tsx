import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';

interface CustomDurationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetDuration: (minutes: number) => void;
}

export default function CustomDurationModal({
  open,
  onOpenChange,
  onSetDuration,
}: CustomDurationModalProps) {
  const [value, setValue] = useState('');

  const handleConfirm = () => {
    const mins = Number(value);
    if (isNaN(mins) || mins <= 0 || mins > 1440) {
      toast.error('Invalid Input', {
        description: 'Please enter a time between 1 and 1440 minutes.',
      });
      return;
    }

    onSetDuration(mins);
    toast.success(`Timer set to ${mins} minutes!`);
    onOpenChange(false);
    setValue('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Custom Focus Time</DialogTitle>
          <DialogDescription>
            {'Enter focus time in minutes (1-1440)'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="minutes" className="text-sm font-medium">
              Minutes
            </label>
            <Input
              id="minutes"
              type="number"
              placeholder="e.g. 25"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Set Time</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
