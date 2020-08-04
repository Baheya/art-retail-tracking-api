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
    const artworkTitle = artwork.imageURL.replace(
      `https://${process.env['AWS_BUCKET_NAME']}.s3.ap-south-1.amazonaws.com/`,
      ''
    );
    let updatedImageURL = generateGetUrl(artworkTitle);
    artwork.imageURL = updatedImageURL;
    console.log(artwork);
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
    updates.forEach((update) => {
      artwork[update] = req.body[update];
    });

    if (req.file) {
      artwork.imageURL = `https://${process.env['AWS_BUCKET_NAME']}.s3.ap-south-1.amazonaws.com/${req.file.originalname}`;
    }
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
      currentEdition: req.body.currentEdition,
      totalEdition: req.body.totalEdition,
      availablePrints: req.body.availablePrints,
      soldPrints: req.body.soldPrints,
      status: req.body.status,
      price: req.body.price,
      storageLink: req.body.storageLink,
      storeLink: req.body.storeLink,
      dateOfCreation: req.body.dateOfCreation,
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

exports.getArtworkSales = async (req, res, next) => {
  try {
    await req.user.populate({ path: 'artworks' }).execPopulate();
    const sales = [];
    req.user.artworks.map((artwork) => {});
  } catch (error) {
    next(error);
  }
};
