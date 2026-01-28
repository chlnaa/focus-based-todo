import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFound from './pages/NotFound.tsx';
import TodayPage from './pages/TodayPage.tsx';
import FocusPage from './pages/FocusPage.tsx';
import FocusHistoryPage from './pages/FocusHistoryPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <TodayPage /> },
      { path: '/today', element: <TodayPage /> },
      { path: '/history', element: <FocusHistoryPage /> },
    ],
  },
  { path: '/focus', element: <FocusPage /> },
  { path: '/focus/:todoId', element: <FocusPage /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
