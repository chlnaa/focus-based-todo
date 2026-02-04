import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFound from './pages/NotFound.tsx';
import TodayPage from './pages/TodayPage.tsx';
import FocusPage from './pages/FocusPage.tsx';
import FocusHistoryPage from './pages/FocusHistoryPage.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

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
    <Toaster richColors position="top-center" />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
