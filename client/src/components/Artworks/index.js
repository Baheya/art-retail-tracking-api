import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import Loading from '../Loading/index';
import { useAuth } from '../../context/auth';

import ArtworksIllustration from '../Illustrations/ArtworksIllustration';

import './artworks.scss';

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { authTokens } = useAuth();

  try {
    useEffect(() => {
      const fetchArtworks = async () => {
        const response = await axios.get('/api/artworks', {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        });
        console.log(response.data);
        setArtworks(...artworks, response.data.artworks);
        setIsLoading(false);
      };
      fetchArtworks();
    }, []);
  } catch (error) {
    setError(true);
    setErrorMessage(error.response.data.message);
  }

  return (
    <main>
      {isLoading ? (
        <Loading text="Fetching your art" />
      ) : (
        <FadeIn>
          {artworks.length === 0 ? (
            <p>
              You haven't uploaded any artworks yet! Start uploading{' '}
              <Link to="/upload">here.</Link>
            </p>
          ) : (
            <>
              <ul className="grid">
                {artworks.map((artwork) => {
                  return (
                    <li key={artwork._id}>
                      <Link to={`/artworks/${artwork._id}`}>
                        <div className="image__container">
                          <div className="image__gradient__overlay"></div>
                          <p className="image__text"> {artwork.title}</p>

                          <img src={artwork.imageURL} alt="" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {isError && (
                <p className="artworks__error__message">{errorMessage}</p>
              )}
            </>
          )}
        </FadeIn>
      )}
    </main>
  );
};

export default Artworks;
