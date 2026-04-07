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
  const [value, setValue] = useState<number | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val === '') {
      setValue('');
      return;
    }

    const num = Number(val);

    if (isNaN(num)) return;

    if (num < 1) return;
    if (num > 1440) {
      setValue(1440);
      return;
    }

    setValue(num);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault();
    }
    if (e.key === 'Enter') handleConfirm();
  };

  const handleConfirm = () => {
    if (value === '') {
      toast.error('Invalid Input', {
        description: 'Please enter a value.',
      });
      return;
    }

    if (value < 1 || value > 1440) {
      toast.error('Invalid Input', {
        description: 'Please enter a time between 1 and 1440 minutes.',
      });
      return;
    }

    onSetDuration(value);
    toast.success(`Timer set to ${value} minutes!`);
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
              min={1}
              max={1440}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
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
