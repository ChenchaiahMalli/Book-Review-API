const db = require('../config/db');

const createReview = async (book_id, user_id, rating, comment) => {
  // Check if user already reviewed this book
  const existingReview = await db.query(
    'SELECT id FROM reviews WHERE book_id = $1 AND user_id = $2',
    [book_id, user_id]
  );

  if (existingReview.rows.length > 0) {
    throw new Error('You have already reviewed this book');
  }

  const result = await db.query(
    'INSERT INTO reviews (book_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
    [book_id, user_id, rating, comment]
  );
  return result.rows[0];
};

const updateReview = async (review_id, user_id, rating, comment) => {
  const result = await db.query(
    'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
    [rating, comment, review_id, user_id]
  );
  return result.rows[0];
};

const deleteReview = async (review_id, user_id) => {
  const result = await db.query(
    'DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING *',
    [review_id, user_id]
  );
  return result.rows[0];
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};