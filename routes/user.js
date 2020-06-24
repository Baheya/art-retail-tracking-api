const express = require('express');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/api/register', userController.register);

router.post('/api/login', userController.login);

router.get('/api/profile', auth, userController.getProfile);

router.patch('/api/profile', auth, userController.updateProfile);

router.post('/api/logout', auth, userController.logout);

router.post('/api/logoutAll', auth, userController.logoutAll);

router.delete('/api/profile', auth, userController.deleteProfile);

module.exports = router;
