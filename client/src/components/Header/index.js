import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Button from '../Button/index';

import FadeIn from 'react-fade-in';

import './header.scss';
import HamburgerToggle from '../HamburgerToggle';

const Header = () => {
  const { authTokens } = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState(null);

  const logout = async () => {
    await axios.post(
      `/api/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      }
    );
    setIsLoggedOut(true);
    localStorage.removeItem('tokens');
    window.location.reload(false);
  };

  const login = () => {
    return <Redirect to="/login" />;
  };

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowDimension <= 840;

  return (
    <header>
      {isLoggedOut && <Redirect to="/login" />}
      <div className="header__icons">
        <div className="nav__hamburger" onClick={(e) => setIsOpen(!isOpen)}>
          <HamburgerToggle isOpen={isOpen} />
        </div>
        <div className="header__logo">
          <NavLink to="/home">
            <p>Art Tracker</p>
          </NavLink>
        </div>
      </div>
      {((isMobile && isOpen) ||
        (!isMobile && !isOpen) ||
        (!isMobile && isOpen)) && (
        <>
          <nav>
            <FadeIn>
              <ul>
                <NavLink activeClassName="active" to="/home">
                  <li>
                    <span className="strikethrough">Ho</span>me
                  </li>
                </NavLink>
                <NavLink activeClassName="active" to="/upload">
                  <li>
                    <span className="strikethrough">Upl</span>oad
                  </li>
                </NavLink>
                <NavLink activeClassName="active" to="/sales">
                  <li>
                    <span className="strikethrough">Sa</span>les
                  </li>
                </NavLink>
                <NavLink activeClassName="active" to="/profile">
                  <li>
                    <span className="strikethrough">Prof</span>ile
                  </li>
                </NavLink>
              </ul>
            </FadeIn>
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
            <Button
              className="header__login__button"
              displayText="Log In"
              onClick={login}
            >
              Log In
            </Button>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
