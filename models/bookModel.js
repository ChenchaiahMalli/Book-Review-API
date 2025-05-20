const db = require('../config/db');

const createBook = async (title, author, genre, published_year) => {
  const result = await db.query(
    'INSERT INTO books (title, author, genre, published_year) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, author, genre, published_year]
  );
  return result.rows[0];
};

const getAllBooks = async (page = 1, limit = 10, author = null, genre = null) => {
  let query = 'SELECT * FROM books';
  const params = [];
  const conditions = [];

  if (author) {
    conditions.push(`author = $${params.length + 1}`);
    params.push(author);
  }

  if (genre) {
    conditions.push(`genre = $${params.length + 1}`);
    params.push(genre);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // Add pagination
  const offset = (page - 1) * limit;
  query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const result = await db.query(query, params);
  return result.rows;
};

const getBookById = async (id) => {
  const bookResult = await db.query('SELECT * FROM books WHERE id = $1', [id]);
  if (bookResult.rows.length === 0) return null;

  const reviewResult = await db.query(
    `SELECT r.id, r.rating, r.comment, r.created_at, u.username 
     FROM reviews r JOIN users u ON r.user_id = u.id 
     WHERE r.book_id = $1`,
    [id]
  );

  const avgRatingResult = await db.query(
    'SELECT AVG(rating) as average_rating FROM reviews WHERE book_id = $1',
    [id]
  );

  return {
    ...bookResult.rows[0],
    average_rating: parseFloat(avgRatingResult.rows[0].average_rating) || 0,
    reviews: reviewResult.rows,
  };
};

const searchBooks = async (query) => {
  const result = await db.query(
    `SELECT * FROM books 
     WHERE LOWER(title) LIKE $1 OR LOWER(author) LIKE $1`,
    [`%${query.toLowerCase()}%`]
  );
  return result.rows;
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  searchBooks,
};