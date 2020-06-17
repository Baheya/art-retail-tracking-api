const Artwork = require('../models/artwork');
const { ErrorHandler } = require('../helpers/error');

exports.getArtworks = async (req, res, next) => {
  try {
    const artworks = await Artwork.find({ artist: req.user._id });
    if (!artworks) {
      throw new ErrorHandler(404, 'Could not find artworks.');
    }
    res.status(200).json({
      message: 'Artworks fetched successfully.',
      artworks: artworks,
    });
  } catch (error) {
    next(error);
  }
};

exports.getArtwork = async (req, res, next) => {
  try {
    const artworkId = req.params.id;
    const artwork = await Artwork.findOne({
      _id: artworkId,
      artist: req.user._id,
    });
    if (!artwork) {
      throw new ErrorHandler(404, 'Could not find artwork.');
    }
    res.status(200).json({ message: 'Artwork fetched successfully.', artwork });
  } catch (error) {
    next(error);
  }
};

exports.updateArtwork = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const artworkId = req.params.id;
  try {
    const artwork = await Artwork.findOne({
      _id: artworkId,
      artist: req.user._id,
    });
    if (!artwork) {
      throw new ErrorHandler(404, 'Could not find artwork.');
    }
    updates.forEach((update) => (artwork[update] = req.body[update]));
    await artwork.save();
    res.status(200).json({ message: 'Updated artwork.', artwork });
  } catch (error) {
    next(error);
  }
};

exports.deleteArtwork = async (req, res, next) => {
  try {
    const artworkId = req.params.id;
    const artwork = await Artwork.findOneAndDelete({
      _id: artworkId,
      artist: req.user._id,
    });
    if (!artwork) {
      throw new ErrorHandler(404, 'Could not find artwork.');
    }
    res.status(200).json({ message: 'Artwork deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.uploadArtwork = async (req, res, next) => {
  try {
    if (!req.body.title || !req.file) {
      throw new ErrorHandler(400, 'Please fill out all required fields.');
    }
    const artwork = new Artwork({
      title: req.body.title,
      imageURL: `https://art-retail-tracking-bucket.s3.ap-south-1.amazonaws.com/${req.file.originalname}`,
      artist: req.user._id,
    });
    await artwork.save();
    res.status(201).json({
      message: 'Artwork uploaded successfully!',
      artwork,
    });
  } catch (error) {
    next(error);
  }
};
