import { Outlet } from 'react-router';
import Nav from '../Nav/Nav';
import styles from './AppLayout.module.scss';
import AppHeader from '../AppHeader';
import { Flex } from '@chakra-ui/react';

const AppLayout = () => {
  return (
    <div className={styles.appContainer}>
      <Nav />
      <Flex flexDirection='column' width='100%'>
        <AppHeader />
        <main className={styles.mainSection}>
          <Outlet />
        </main>
      </Flex>
    </div>
  );
};

export default AppLayout;
