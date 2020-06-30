import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';

import ArtworksIllustration from '../Illustrations/ArtworksIllustration';

import '../../styles/artworks.scss';

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { authTokens } = useAuth();

  try {
    useEffect(() => {
      const fetchArtworks = async () => {
        const result = await axios.get('/api/artworks', {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        });
        console.log(result.data);
        setArtworks(...artworks, result.data.artworks);
      };
      fetchArtworks();
    }, []);
  } catch (error) {
    setError(true);
    setErrorMessage(error.response.data.message);
  }

  if (artworks.length === 0) {
    return (
      <div>
        <p>
          You haven't uploaded any artworks yet! Start uploading{' '}
          <Link to="/upload">here.</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="artworks__page__header">
        <h1>Your Artwork</h1>
        <div className="artworks__illustration__container">
          <ArtworksIllustration />
        </div>
      </div>
      <ul className="artworks__gallery__container">
        {artworks.map((artwork) => {
          return (
            <li key={artwork._id}>
              <a href={`/artworks/${artwork._id}`}>
                <div className="image__container">
                  <div className="image__gradient__overlay"></div>
                  <img src={artwork.imageURL} alt="" />
                  <p className="image__text"> {artwork.title}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
      {isError && <p className="artworks__error__message">{errorMessage}</p>}
    </div>
  );
};

export default Artworks;
