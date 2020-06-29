const Artwork = require('../models/artwork');
const { ErrorHandler } = require('../helpers/error');
const { deleteS3Artwork, generateGetUrl } = require('../helpers/aws-s3');

exports.getArtworks = async (req, res, next) => {
  try {
    await req.user.populate({ path: 'artworks' }).execPopulate();

    let artworks = [];
    await req.user.artworks.forEach(async (artwork) => {
      const artworkTitle = artwork.imageURL.replace(
        `https://${process.env['AWS_BUCKET_NAME']}.s3.ap-south-1.amazonaws.com/`,
        ''
      );
      let updatedImageURL = generateGetUrl(artworkTitle);
      let updatedArtwork = {
        ...artwork._doc,
        imageURL: updatedImageURL,
      };
      artworks.push(updatedArtwork);
    });

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
    const artwork = await Artwork.findOne({
      _id: artworkId,
      artist: req.user._id,
    });
    if (!artwork) {
      throw new ErrorHandler(404, 'Could not find artwork.');
    }
    const artworkS3name = artwork.imageURL.replace(
      `https://${process.env['AWS_BUCKET_NAME']}.s3.ap-south-1.amazonaws.com/`,
      ''
    );
    console.log(artworkS3name);
    await deleteS3Artwork(artworkS3name);
    await artwork.remove();
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
      imageURL: `https://${process.env['AWS_BUCKET_NAME']}.s3.ap-south-1.amazonaws.com/${req.file.originalname}`,
      artist: req.user._id,
      edition: req.body.edition,
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
