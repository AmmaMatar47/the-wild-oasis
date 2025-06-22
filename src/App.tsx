import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Toaster } from './components/ui/toaster';
import AppLayout from './components/AppLayout/AppLayout';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import { ColorModeProvider } from './components/ui/color-mode';
import Signup from './pages/Signup';
import Spinner from './components/Spinner/Spinner';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Cabins = lazy(() => import('./pages/Cabins'));
const Bookings = lazy(() => import('./pages/Bookings'));
const BookingsDetails = lazy(() => import('./pages/BookingsDetails'));
const CheckIn = lazy(() => import('./pages/CheckIn'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider>
            <BrowserRouter>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route index element={<Navigate to='login' replace />} />
                  <Route
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate replace={true} to='/dashboard' />} />
                    <Route
                      path='dashboard'
                      element={
                        <Suspense fallback={<Spinner />}>
                          <Dashboard />
                        </Suspense>
                      }
                    />
                    <Route path='users' element={<Users />} />
                    <Route
                      path='profile'
                      element={
                        <Suspense fallback={<Spinner />}>
                          <Profile />
                        </Suspense>
                      }
                    />
                    <Route
                      path='cabins'
                      element={
                        <Suspense fallback={<Spinner />}>
                          <Cabins />
                        </Suspense>
                      }
                    />
                    <Route
                      path='bookings'
                      element={
                        <Suspense fallback={<Spinner />}>
                          <Bookings />
                        </Suspense>
                      }
                    />
                    <Route
                      path='bookings/:bookingsId'
                      element={
                        <Suspense fallback={<Spinner />}>
                          <BookingsDetails />
                        </Suspense>
                      }
                    />
                    <Route
                      path='checkin/:bookingsId'
                      element={
                        <Suspense fallback={<Spinner />}>
                          <CheckIn />
                        </Suspense>
                      }
                    />
                    <Route path='settings' element={<Settings />} />
                  </Route>
                  <Route path='signup' element={<Signup />} />
                  <Route path='login' element={<Login />} />
                  <Route path='*' element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
            <Toaster />
          </ColorModeProvider>
        </ChakraProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
