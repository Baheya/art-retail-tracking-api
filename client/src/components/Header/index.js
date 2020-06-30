import React, { useState } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Button from '../Button/index';

import '../../styles/header.scss';

const Header = () => {
  const { authTokens } = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logout = () => {
    setIsLoggedOut(true);
    localStorage.removeItem('tokens');
    window.location.reload(false);
  };

  return (
    <header>
      {isLoggedOut && <Redirect to="/login" />}
      <div className="header__logo">
        <NavLink to="/home">
          <p>Art Tracker</p>
        </NavLink>
      </div>
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
      {authTokens ? (
        <Button
          className="header__logout__button"
          displayText="Log Out"
          onClick={logout}
        >
          Log Out
        </Button>
      ) : (
        <NavLink to="/login" className="header__login__link">
          <p>Log In</p>
        </NavLink>
      )}
    </header>
  );
};

export default Header;
