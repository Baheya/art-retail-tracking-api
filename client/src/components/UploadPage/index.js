import React, { useState } from 'react';
import { useAuth } from '../../context/auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import FadeIn from 'react-fade-in';

import ArtworkForm from '../ArtworkForm';

import './uploadpage.scss';
import Loading from '../Loading';

const UploadPage = () => {
  const [artworkForm, setArtworkForm] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authTokens } = useAuth();

  const updateForm = (value, name) => {
    setArtworkForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(artworkForm);
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(artworkForm).map((key) => {
        formData.append(`${key}`, artworkForm[key]);
      });
      const response = await axios.post('/api/upload-artwork', formData, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      });
      if (response.status === 201) {
        setIsUploaded(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(error.response.data.message);
    }
  };

  if (isUploaded) {
    return <Redirect to="/home" />;
  }

  return (
    <FadeIn>
      {isLoading ? (
        <Loading text="Uploading your art" />
      ) : (
        <div className="upload_page__container">
          <ArtworkForm
            updateForm={updateForm}
            postSubmit={postSubmit}
            artworkForm={artworkForm}
            buttonText="Upload"
          />
          {isError && <p className="upload__error__message">{errorMessage}</p>}
        </div>
      )}
    </FadeIn>
  );
};

export default UploadPage;
