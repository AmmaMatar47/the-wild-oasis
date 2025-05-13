import { Outlet } from "react-router";
import Nav from "../Nav/Nav";
import styles from "./AppLayout.module.scss";

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
