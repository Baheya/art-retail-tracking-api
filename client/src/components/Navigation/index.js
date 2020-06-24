import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navigation.scss';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <Link to="/home">
          <li>Home</li>
        </Link>
        <Link to="/upload">
          <li>Upload</li>
        </Link>
        <Link to="/sales">
          <li>Sales</li>
        </Link>
        <Link to="/profile">
          <li>Profile</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;
