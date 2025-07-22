import styles from "./Nav.module.scss";

import { NavLink } from "react-router";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { useTheme } from "@/context/ThemeContext";

const Nav = () => {
  const { theme } = useTheme();

  return (
    <nav className={styles.nav}>
      <img
        src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
        alt=""
        className={styles.appLogo}
      />

      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="dashboard" className={styles.navLink}>
            <HiOutlineHome /> <span>Home</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="bookings" className={styles.navLink}>
            <HiOutlineCalendarDays /> <span>Bookings</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="cabins" className={styles.navLink}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="users" className={styles.navLink}>
            <HiOutlineUsers /> <span>Users</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="settings" className={styles.navLink}>
            <HiOutlineCog6Tooth /> <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
