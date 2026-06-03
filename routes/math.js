const express = require('express');
const router = express.Router();
const MathController = require('../controller/MathController');
const { isAuthenticated } = require('../middleware/auth');

router.use(isAuthenticated);

router.get('/char-match', MathController.showCharMatch);
router.post('/char-match', MathController.processCharMatch);

module.exports = router;