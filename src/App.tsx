import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Users from './pages/Users';
import Cabins from './pages/Cabins';
import Bookings from './pages/Bookings';
import Settings from './pages/Settings';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import { RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace={true} to='/dashboard' />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='Users' element={<Users />} />
        <Route path='account' element={<Account />} />
        <Route path='cabins' element={<Cabins />} />
        <Route path='bookings' element={<Bookings />} />
        <Route path='settings' element={<Settings />} />
      </Route>

      <Route path='login' element={<Login />} />
      <Route path='*' element={<PageNotFound />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
