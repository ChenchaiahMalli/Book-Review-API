const express = require('express');
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/books/:id/reviews', protect, reviewController.createReview);
router.put('/reviews/:id', protect, reviewController.updateReview);
router.delete('/reviews/:id', protect, reviewController.deleteReview);

module.exports = router;