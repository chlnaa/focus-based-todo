import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFound from './pages/NotFound.tsx';
import TodayPage from './pages/TodayPage.tsx';
import FocusPage from './pages/FocusPage.tsx';
import FocusHistoryPage from './pages/FocusHistoryPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import SignInPage from './pages/SignInPage.tsx';
import SessionProvider from './provider/SessionProvider.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MemberOnlyLayout from './components/layout/MemberOnlyLayout.tsx';
import ForgetPasswordPage from './pages/ForgetPasswordPage.tsx';
import ResetPasswordPage from './pages/ResetPasswordPage.tsx';
import GuestOnlyLayout from './components/layout/GuestOnlyLayout.tsx';
import AuthGuardLayout from './components/layout/AuthGuardLayout.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        element: <GuestOnlyLayout />,
        children: [
          { path: '/sign-up', element: <SignUpPage /> },
          { path: '/sign-in', element: <SignInPage /> },
          { path: '/forget-password', element: <ForgetPasswordPage /> },
        ],
      },

      {
        element: <MemberOnlyLayout />,
        children: [
          { index: true, element: <TodayPage /> },
          { path: '/today', element: <TodayPage /> },
          { path: '/history', element: <FocusHistoryPage /> },
          { path: '/reset-password', element: <ResetPasswordPage /> },
        ],
      },
      {
        element: <AuthGuardLayout />,
        children: [
          { path: '/focus', element: <FocusPage /> },
          { path: '/focus/:todoId', element: <FocusPage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <RouterProvider router={router} />
          <Toaster richColors position="top-center" />
        </SessionProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
