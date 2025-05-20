const Book = require('../models/bookModel');

const createBook = async (req, res) => {
  try {
    const { title, author, genre, published_year } = req.body;
    const book = await Book.createBook(title, author, genre, published_year);

    res.status(201).json({
      status: 'success',
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const books = await Book.getAllBooks(
      parseInt(page),
      parseInt(limit),
      author,
      genre
    );

    res.status(200).json({
      status: 'success',
      results: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: 'fail',
        message: 'Book not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        status: 'fail',
        message: 'Search query is required',
      });
    }

    const books = await Book.searchBooks(q);
    res.status(200).json({
      status: 'success',
      results: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  searchBooks,
};