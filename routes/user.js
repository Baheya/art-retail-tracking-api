const express = require('express');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/profile', auth, userController.getProfile);

router.patch('/profile', auth, userController.updateProfile);

router.post('/logout', auth, userController.logout);

router.post('/logoutAll', auth, userController.logoutAll);

router.delete('/profile', auth, userController.deleteProfile);

module.exports = router;
