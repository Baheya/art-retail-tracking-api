import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.scss';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <NavLink activeClassName="active" to="/home">
          <li>Home</li>
        </NavLink>
        <NavLink activeClassName="active" to="/upload">
          <li>Upload</li>
        </NavLink>
        <NavLink activeClassName="active" to="/sales">
          <li>Sales</li>
        </NavLink>
        <NavLink activeClassName="active" to="/profile">
          <li>Profile</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
