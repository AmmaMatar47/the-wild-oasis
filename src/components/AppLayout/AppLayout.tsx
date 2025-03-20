import styles from './AppLayout.module.scss';

import { Outlet } from 'react-router';
import Nav from '../Nav/Nav';

const AppLayout = () => {
  return (
    <div className={styles.appContainer}>
      <Nav />

      <main className={styles.mainSection}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
