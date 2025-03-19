import { NavLink } from 'react-router';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='dashboard'>Home</NavLink>
        </li>
        <li>
          <NavLink to='bookings'>Bookings</NavLink>
        </li>
        <li>
          <NavLink to='cabins'>Cabins</NavLink>
        </li>
        <li>
          <NavLink to='users'>Users</NavLink>
        </li>
        <li>
          <NavLink to='settings'>Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
