import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h2>To Do App</h2>
      <div className="links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/Createtask" className={location.pathname === '/Createtask' ? 'active' : ''}>New Task</Link>
      </div>
    </nav>
  );
}

export default Navbar;