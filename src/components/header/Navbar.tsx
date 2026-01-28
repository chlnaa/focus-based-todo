import { AlarmClockCheck, Sun } from 'lucide-react';
import { Link } from 'react-router';
import MenuButton from './MenuButton';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <Link to={'/'}>
        <div className="flex items-center gap-2">
          <AlarmClockCheck />
          <h1 className="text-2xl font-bold">FocusDo</h1>
        </div>
      </Link>
      <div className="flex items-center gap-5">
        <Sun />
        <MenuButton />
      </div>
    </nav>
  );
}
