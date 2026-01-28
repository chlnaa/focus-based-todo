import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/header/Navbar';

function App() {
  return (
    <div className="flex flex-col w-full max-w-175 m-auto mt-5 gap-5">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
