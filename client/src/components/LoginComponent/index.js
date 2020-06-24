import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginIllustration from '../Illustrations/LoginIllustration';
import { useAuth } from '../../context/auth';
import Input from '../Input/index';
import Button from '../Button/index';

import '../../styles/logincomponent.scss';

const LoginComponent = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();

  const postLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setIsError(true);
      setErrorMessage('Please fill out all the required fields.');
    } else if (!email.includes('@')) {
      setIsError(true);
      setErrorMessage('Please enter a valid email.');
    }
    try {
      const result = await axios.post('/api/login', { email, password });
      console.log(result.data);
      if (result.status === 200) {
        await setAuthTokens(result.data.token);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <div className="login__container">
        <div className="login__form__container">
          <form className="login__form__component">
            <h2>Log In</h2>
            <label htmlFor="email">Email: </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Type your email address here"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="password">Password: </label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Type your password here"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button
              className="login__button"
              onClick={postLogin}
              displayText="Log In"
            />
            <p className="login__text--bottom">
              Don't have an account? <Link to="/register">Register here.</Link>
            </p>
            {isError && <p className="login__error__message">{errorMessage}</p>}
          </form>
        </div>
        <div className="login__illustration__container">
          <LoginIllustration />
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
