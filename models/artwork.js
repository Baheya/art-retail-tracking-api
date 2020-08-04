const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    currentEdition: {
      type: Number,
      required: false,
      trim: true,
      default: 1,
    },
    totalEdition: {
      type: Number,
      required: false,
      trim: true,
      default: 20,
    },
    imageURL: {
      type: String,
      required: false,
      default: 'Not provided',
    },
    availablePrints: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
      min: 0,
    },
    soldPrints: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Print not available', 'Print available', 'Preparing print'],
      default: 'Print not available',
    },
    price: {
      type: Number,
      required: false,
      default: 0,
      trim: true,
    },
    storageLink: {
      type: String,
      required: false,
      trim: true,
      default: 'Not provided',
    },
    storeLink: {
      type: String,
      required: false,
      trim: true,
      default: 'Not provided',
    },
    dateOfCreation: {
      type: Date,
      required: false,
      trim: true,
      default: Date.now(),
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

artworkSchema.virtual('sales', {
  ref: 'Sale',
  localField: '_id',
  foreignField: 'artwork',
});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
