const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Check if Authorization header exists
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract token from header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token and decode user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    // Handle token verification errors
    res.status(401).json({ message: 'Token is not valid' });
  }
};
