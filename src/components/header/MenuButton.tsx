import { Link } from 'react-router';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { PopoverClose } from '@radix-ui/react-popover';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function MenuButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'} className="cursor-pointer">
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-35 p-0">
        <PopoverClose asChild>
          <Link to={'/history'}>
            <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">
              Focus History
            </div>
          </Link>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
