import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Input from '../Input/index';
import Button from '../Button/index';
import RegisterIllustration from '../Illustrations/RegisterIllustration';

const RegisterComponent = () => {
  const [isError, setError] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();

  const postRegister = async () => {
    console.log(name);
    try {
      const response = await axios.post('/api/register', {
        data: { name: name, email: email, password: password },
      });
      if (response.status === 201) {
        setRegistered(true);
        setAuthTokens(response.data);
      }
      setError(true);
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  if (isRegistered) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="register-container">
      <div className="form-container">
        <form>
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
        </form>
        {isError && <p>{errorMessage}</p>}
        <Button displayText="Register" onClick={postRegister} />
        <p>
          Already have an account? <Link to="/login">Login here.</Link>
        </p>
      </div>
      <RegisterIllustration />
    </div>
  );
};

export default RegisterComponent;
