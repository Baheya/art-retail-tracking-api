import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';

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
      <h1>Your Artworks</h1>
      <ul>
        {artworks.map((artwork) => {
          return (
            <li key={artwork._id}>
              <h3>{artwork.title}</h3>
              <img src={artwork.imageURL} alt="" />
            </li>
          );
        })}
      </ul>
      {isError && <p className="artworks__error__message">{errorMessage}</p>}
    </div>
  );
};

export default Artworks;
