import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css';
function NavBar({ user }) {
  return (
    <div className='main-nav'>
      <Link className='nav-items' to='/'>Home</Link>
      <div className='nav-right'>
        {/* {username && <p className='logout-text' onClick={logout}><SlLogout/> Logout</p>}
          <Link className='logout-text' to='user-profile'><p><CgProfile/> {username}</p></Link> */}
       <Link className='nav-items' to='/user-profile' state={{ user }}>Profile</Link>
        <Link className='nav-items' to='/logot'>Logout</Link>


      </div>
    </div>
  )
}

export default NavBar
