import { Outlet } from 'react-router';
import Navbar from './components/header/Navbar';

function App() {
  return (
    <div className="w-full min-h-screen max-w-175 flex flex-col m-auto mt-4 px-4 sm:px-6 gap-5 ">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
