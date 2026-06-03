const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');
const { isAuthenticated } = require('../middleware/auth');

router.use(isAuthenticated);

router.get('/', ProductController.index);
router.get('/create', ProductController.showCreate);
router.post('/', ProductController.create);
router.get('/:id', ProductController.show);
router.get('/:id/edit', ProductController.showEdit);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.destroy);

module.exports = router;
