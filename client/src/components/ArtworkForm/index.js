import React from 'react';
import Input from '../Input/index';
import Button from '../Button/index';

import './artworkform.scss';

const ArtworkForm = (props) => {
  return (
    <div className="upload_form__container">
      <form className="upload__form">
        <div className="form__input">
          <label htmlFor="title">Title: </label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title here"
            onChange={(e) => {
              props.updateForm(e.target.value, e.target.name);
            }}
            value={props.artworkForm.title || ''}
          />
        </div>
        <div className="form__input">
          <label htmlFor="image" className="custom__file__input">
            <Input
              type="file"
              id="image"
              name="image"
              onChange={(e) => {
                props.updateForm(e.target.files[0], e.target.name);
              }}
            />
            Select a file
          </label>
          <input
            type="text"
            className="image__selection__text__preview"
            value={
              props.artworkForm.image
                ? props.artworkForm.image.name
                : 'No file chosen'
            }
            readOnly
          />
        </div>
        <div className="form__input">
          <label htmlFor="currentEdition">Edition: </label>
          <div className="edition__input">
            <Input
              type="number"
              id="currentEdition"
              name="currentEdition"
              value={props.artworkForm.currentEdition || ''}
              onChange={(e) => {
                props.updateForm(e.target.value, e.target.name);
              }}
            />
            <p>of</p>
            <Input
              type="number"
              id="totalEdition"
              name="totalEdition"
              value={props.artworkForm.totalEdition || ''}
              onChange={(e) => {
                props.updateForm(e.target.value, e.target.name);
              }}
            />
          </div>
        </div>
        <div className="form__input">
          <label htmlFor="availablePrints">Available Prints: </label>
          <Input
            type="number"
            id="availablePrints"
            name="availablePrints"
            min="0"
            value={props.artworkForm.availablePrints || ''}
            onChange={(e) => {
              props.updateForm(e.target.value, e.target.name);
            }}
          />
        </div>
        <div className="form__input">
          <label htmlFor="status">Status: </label>
          <select
            name="status"
            id="status"
            onChange={(e) => {
              props.updateForm(e.target.value, e.target.name);
            }}
          >
            <option value="Print not available">Print not available</option>
            <option value="Print available">Print available</option>
            <option value="Preparing print">Preparing print</option>
          </select>
        </div>
        <div className="form__input">
          <label htmlFor="price">Price: </label>
          <Input
            type="number"
            id="price"
            name="price"
            value={props.artworkForm.price || ''}
            onChange={(e) => {
              props.updateForm(e.target.value, e.target.name);
            }}
          />
        </div>
        <div className="form__input">
          <label htmlFor="storageLink">Storage Link: </label>
          <Input
            type="text"
            id="storageLink"
            name="storageLink"
            value={props.artworkForm.storageLink || ''}
            onChange={(e) => {
              props.updateForm(e.target.value, e.target.name);
            }}
          />
        </div>
        <div className="form__input">
          <label htmlFor="storeLink">Store Link: </label>
          <Input
            type="text"
            id="storeLink"
            name="storeLink"
            value={props.artworkForm.storeLink || ''}
            onChange={(e) => {
              props.updateForm(e.target.value, e.target.name);
            }}
          />
        </div>
        <div className="form__input">
          <label htmlFor="dateOfCreation">Date created: </label>
          <Input
            type="date"
            id="dateOfCreation"
            name="dateOfCreation"
            value={props.artworkForm.dateOfCreation || ''}
            onChange={(e) => {
              props.updateForm(e.target.value, e.target.name);
            }}
          />
        </div>
      </form>
      <Button
        className="upload__button"
        onClick={props.postSubmit}
        displayText={props.buttonText}
      />
    </div>
  );
};

export default ArtworkForm;
