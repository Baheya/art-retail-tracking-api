import React, { useState } from 'react';
import axios from 'axios';

import { useAuth } from '../../context/auth';
import Input from '../Input/index';
import Button from '../Button/index';
import { Redirect } from 'react-router-dom';

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const { authTokens } = useAuth();

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image);
      const response = await axios.post('/api/upload-artwork', formData, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      });
      if (response.status === 201) {
        setIsUploaded(true);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  if (isUploaded) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="upload__container">
      <div className="upload__form__container">
        <form className="upload__form">
          <h2>Upload Artwork</h2>
          <label htmlFor="title">Title: </label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="image">Select the file you want to upload: </label>
          <Input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button
            className="artwork__upload__button"
            onClick={postSubmit}
            displayText="Upload"
          />
          {isError && <p className="upload__error__message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
