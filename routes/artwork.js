const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../helpers/multer');

const artworkController = require('../controllers/artwork');

const router = new express.Router();

router.get('/artworks', auth, artworkController.getArtworks);
router.get('/artwork/:id', auth, artworkController.getArtwork);

router.post('/upload-artwork', auth, upload, artworkController.uploadArtwork);

router.patch('/artwork/:id', auth, upload, artworkController.updateArtwork);

router.delete('/artwork/:id', auth, artworkController.deleteArtwork);

module.exports = router;
