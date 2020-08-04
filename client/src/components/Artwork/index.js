import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';
import Button from '../Button/index';

import './artwork.scss';
import Loading from '../Loading/index';
import ArtworkForm from '../ArtworkForm';

const Artwork = () => {
  const artworkId = window.location.pathname.replace('/artworks/', '');
  const { authTokens } = useAuth();

  const [artwork, setArtwork] = useState({});
  const [updatedArtwork, setUpdatedArtwork] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleSale, setToggleSale] = useState(false);

  try {
    useEffect(() => {
      const fetchArtwork = async () => {
        const response = await axios.get(`/api/artwork/${artworkId}`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        setArtwork(response.data.artwork);
        setIsLoading(false);
      };
      fetchArtwork();
    }, [isEditing, setArtwork, toggleSale]);
  } catch (error) {
    setIsError(true);
    setErrorMessage(error.response.data.message);
  }

  const updateForm = (value, name) => {
    setArtwork((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setUpdatedArtwork((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postSubmitChanges = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(updatedArtwork).map((key) => {
        formData.append(`${key}`, artwork[key]);
      });
      const response = await axios.patch(
        `/api/artwork/${artwork._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        }
      );
      if (response.status === 200) {
        setIsEditing(false);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const addNewSoldPrint = async (e) => {
    e.preventDefault();
    const date = Date.now();
    const body = {
      date,
      artwork: artwork,
      editionSold: artwork.currentEdition,
    };
    try {
      const response = await axios.post(`/api/sales`, body, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      console.log(response.data);
      setToggleSale(!toggleSale);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  if (isEditing) {
    return (
      <FadeIn>
        <div className="artwork__page__container">
          <ArtworkForm
            updateForm={updateForm}
            artworkForm={artwork}
            buttonText="Save Changes"
            postSubmit={postSubmitChanges}
            type="editForm"
          />
        </div>
      </FadeIn>
    );
  } else if (!isEditing) {
    return (
      <div>
        {isLoading ? (
          <Loading text="Fetching Data" />
        ) : (
          <FadeIn>
            <Link to="/home" className="back__button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-left"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#171933"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="5" y1="12" x2="11" y2="18" />
                <line x1="5" y1="12" x2="11" y2="6" />
              </svg>
            </Link>
            <div className="grid">
              <div className="artwork-image__container">
                <img src={artwork.imageURL} />
              </div>
              <div className="artwork__info__container">
                <div className="artwork-info__header">
                  <h2>{artwork.title}</h2>
                  <p className="artwork__price">${artwork.price}.00</p>
                  <p>
                    Edition{' '}
                    <span className="artwork__edition">
                      {artwork.currentEdition}/{artwork.totalEdition}
                    </span>
                  </p>
                </div>

                <ul>
                  <li>
                    <span className="artwork-info__key">Available Prints:</span>{' '}
                    {artwork.availablePrints}
                  </li>
                  <li>
                    <span className="artwork-info__key">Sold Prints:</span>{' '}
                    {artwork.soldPrints}
                  </li>
                  <li>
                    <span className="artwork-info__key">Status:</span>{' '}
                    {artwork.status}
                  </li>
                  <li>
                    <span className="artwork-info__key">Storage Link:</span>{' '}
                    {artwork.storageLink}
                  </li>
                  <li>
                    <span className="artwork-info__key">Store Link:</span>{' '}
                    {artwork.storeLink}
                  </li>
                  <li>
                    <span className="artwork-info__key">Date Created:</span>{' '}
                    {new Date(artwork.dateOfCreation).toLocaleDateString()}
                  </li>
                  {isError && <li>{errorMessage}</li>}
                </ul>
                <Button
                  className="sell-print__button"
                  onClick={addNewSoldPrint}
                  displayText="I sold this print!"
                />
                <Button displayText="Edit" onClick={() => setIsEditing(true)} />
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    );
  }
};

export default Artwork;
