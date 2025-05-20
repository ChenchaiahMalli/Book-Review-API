const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findUserById(decoded.id);

      next();
    } catch (error) {
      res.status(401).json({
        status: 'fail',
        message: 'Not authorized',
      });
    }
  }

  if (!token) {
    res.status(401).json({
      status: 'fail',
      message: 'Not authorized, no token',
    });
  }
};

module.exports = { protect };