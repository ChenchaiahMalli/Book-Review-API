const Review = require('../models/reviewModel');

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const book_id = req.params.id;
    const user_id = req.user.id;

    const review = await Review.createReview(book_id, user_id, rating, comment);

    res.status(201).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review_id = req.params.id;
    const user_id = req.user.id;

    const review = await Review.updateReview(review_id, user_id, rating, comment);
    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Review not found or you are not authorized to update it',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review_id = req.params.id;
    const user_id = req.user.id;

    const review = await Review.deleteReview(review_id, user_id);
    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Review not found or you are not authorized to delete it',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};