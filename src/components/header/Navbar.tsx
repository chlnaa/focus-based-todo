import { AlarmClockCheck, Sun } from 'lucide-react';
import { Link } from 'react-router';
import MenuButton from './MenuButton';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <Link to={'/'}>
        <div className="flex items-center gap-2">
          <AlarmClockCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          <h1 className="text-lg sm:text-2xl font-bold">FocusDo</h1>
        </div>
      </Link>
      <div className="flex items-center gap-5">
        <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
        <MenuButton />
      </div>
    </nav>
  );
}
