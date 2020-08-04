const mongoose = require('mongoose');
const Artwork = require('./artwork');

const saleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    artwork: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Artwork',
    },
    editionSold: {
      type: Number,
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

saleSchema.post('save', async function () {
  const sale = this;
  const artwork = await Artwork.findOne({
    _id: sale.artwork,
    artist: sale.artist,
  });
  console.log(artwork);
  artwork.currentEdition = artwork.currentEdition + 1;
  artwork.availablePrints = artwork.availablePrints - 1;
  artwork.soldPrints = artwork.soldPrints + 1;
  console.log(artwork);
  await artwork.save();
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
