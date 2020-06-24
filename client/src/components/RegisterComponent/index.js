import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Input from '../Input/index';
import Button from '../Button/index';
import RegisterIllustration from '../Illustrations/RegisterIllustration';

import '../../styles/registercomponent.scss';

const RegisterComponent = () => {
  const [isError, setIsError] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();

  const postRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setIsError(true);
      setErrorMessage('Please fill out all the required fields.');
    } else if (!email.includes('@')) {
      setIsError(true);
      setErrorMessage('Please enter a valid email.');
    }
    try {
      const result = await axios.post('/api/register', {
        data: { name: name, email: email, password: password },
      });
      if (result.status === 201) {
        await setAuthTokens(result.data.token);
        setRegistered(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  if (isRegistered) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="register__container">
      <div className="register__form__container">
        <form className="register__form__component">
          <h2>Register</h2>
          <label htmlFor="email">Email: </label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email here"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="Username">Name: </label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your first name here"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label htmlFor="password">Password: </label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password here"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            className="register__button"
            displayText="Register"
            onClick={postRegister}
          />
          <p className="register__text--bottom">
            Already have an account? <Link to="/login">Log In here.</Link>
          </p>
          {isError && (
            <p className="register__error__message">{errorMessage}</p>
          )}
        </form>
      </div>
      <div className="register__illustration__container">
        <RegisterIllustration />
      </div>
    </div>
  );
};

export default RegisterComponent;
