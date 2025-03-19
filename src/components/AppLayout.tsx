import { Outlet } from 'react-router';
import Nav from './Nav';

const AppLayout = () => {
  return (
    <>
      <Nav />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
