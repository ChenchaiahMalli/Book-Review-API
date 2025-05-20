const express = require('express');
const bookController = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.get('/search', bookController.searchBooks);

module.exports = router;