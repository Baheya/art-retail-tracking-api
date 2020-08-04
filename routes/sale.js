const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../helpers/multer');

const saleController = require('../controllers/sale');

const router = new express.Router();

router.get('/api/sales', auth, saleController.getSales);

router.post('/api/sales', auth, saleController.createSale);

module.exports = router;
