const express = require('express');
const router = express.Router();
const DashboardController = require('../controller/DashboardController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, DashboardController.index);

module.exports = router;