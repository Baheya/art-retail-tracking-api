const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    edition: {
      type: Number,
      required: false,
      trim: true,
    },
    imageURL: {
      type: String,
      required: false,
    },
    prints: {
      type: Number,
      required: false,
      trim: true,
    },
    // status: [
    //   { unsold: { type: Boolean } },
    //   { preparing: { type: Boolean } },
    //   { sold: { type: Boolean } },
    // ],
    price: {
      type: Number,
      required: false,
    },
    storageLink: {
      type: String,
      required: false,
    },
    storeLink: {
      type: String,
      required: false,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
