const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const { isGuest } = require('../middleware/auth');

router.get('/login', isGuest, AuthController.showLoginForm);
router.post('/login', isGuest, AuthController.login);
router.get('/logout', AuthController.logout);

module.exports = router;