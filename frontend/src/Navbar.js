import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Scheduled Appointments</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/book" style={styles.navLink}>Book Appointment</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '3px',
    transition: 'background-color 0.3s ease',
  },
  navLinkHover: {
    backgroundColor: '#555',
  },
};

export default Navbar;
