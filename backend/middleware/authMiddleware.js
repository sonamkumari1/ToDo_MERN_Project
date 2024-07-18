// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || '';
    const decoded = jwt.verify(token, secret);

    req.user = decoded.id; // Assuming JWT payload has 'id' field

    next();
  } catch (error) {
    console.error('Invalid Token:', error);
    return res.status(403).json({ success: false, message: 'Invalid Token.' });
  }
};

module.exports = authMiddleware;
