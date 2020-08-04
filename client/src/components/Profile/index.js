import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import FadeIn from 'react-fade-in';

import Loading from '../Loading';

const Profile = () => {
  const { authTokens } = useAuth();
  const [error, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  try {
    useEffect(() => {
      const getProfile = async () => {
        const response = await axios.get(`/api/profile`, {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data.user);
          setUser(response.data.user);
          setIsLoading(false);
        }
      };
      getProfile();
    }, []);
  } catch (error) {
    setIsError(true);
    setErrorMessage(error.response.data.message);
  }

  return (
    <>
      {isLoading ? (
        <Loading text="Getting your info" />
      ) : (
        <FadeIn>
          <h1>Profile</h1>
          <ul>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
          </ul>
        </FadeIn>
      )}
    </>
  );
};

export default Profile;
