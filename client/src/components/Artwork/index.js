import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';

import Input from '../Input/index';

import '../../styles/artwork.scss';

const Artwork = () => {
  const artworkId = window.location.pathname.replace('/artworks/', '');
  const { authTokens } = useAuth();

  const [artwork, setArtwork] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  try {
    useEffect(() => {
      const fetchArtwork = async () => {
        const response = await axios.get(`/api/artwork/${artworkId}`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        console.log(response);
        setArtwork(response.data.artwork);
      };
      fetchArtwork();
    }, []);
  } catch (error) {
    setIsError(true);
    setErrorMessage(error.response.data.message);
  }

  return (
    <div className="artwork__page__container">
      {isError && <p>{errorMessage}</p>}
      <img src={artwork.imageURL} />
      <div className="artwork__info__container">
        <h2>{artwork.title}</h2>

        <ul>
          <li>
            Edition:{' '}
            <Input
              value={
                artwork.edition || artwork.edition === ''
                  ? artwork.edition
                  : 'Edition not provided.'
              }
              onChange={(e) =>
                setArtwork({ ...artwork, edition: e.target.value })
              }
            />
          </li>
          <li>
            Year of publication:{' '}
            {artwork.year ? artwork.year : 'Year not provided.'}
          </li>
          <li>
            Description:{' '}
            {artwork.description
              ? artwork.description
              : 'No description provided.'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Artwork;
