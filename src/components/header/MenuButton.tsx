import { Link } from 'react-router';
import { UserRound } from 'lucide-react';
import { Button } from '../ui/button';
import { signOut } from '@/api/auth';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';

export default function MenuButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant={'ghost'} size={'icon'}>
          <UserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-35 p-0">
        <DropdownMenuItem
          asChild
          className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
        >
          <Link to={'/history'}>Focus History</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
          onClick={signOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
