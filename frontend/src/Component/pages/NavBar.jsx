import React from 'react';
import axios from 'axios';
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar({ user }) {
    const handleLogout = async () => {
      try {
        await axios.delete('http://127.0.0.1:8000/logout/');
        console.log('Logout successful:', user);
        window.location.href = '/';
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
  
  return (
    <div className='main-nav'>
      <Link className='nav-items' to='/home' state={{ user }}>Home</Link>
      <div className='nav-right'>
        <Link className='nav-items' to='/user-profile' state={{ user }}>Profile</Link>
        <Link className='nav-items' onClick={handleLogout} state={{ user }}>Logout</Link>
      </div>
    </div>
  );
}

export default NavBar;
