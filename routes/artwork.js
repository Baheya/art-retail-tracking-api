const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../helpers/multer');

const artworkController = require('../controllers/artwork');

const router = new express.Router();

router.get('/api/artworks', auth, artworkController.getArtworks);
router.get('/api/artwork/:id', auth, artworkController.getArtwork);

router.post(
  '/api/upload-artwork',
  auth,
  upload,
  artworkController.uploadArtwork
);

router.patch('/api/artwork/:id', auth, upload, artworkController.updateArtwork);

router.delete('/api/artwork/:id', auth, artworkController.deleteArtwork);

module.exports = router;
