const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { ErrorHandler } = require('../helpers/error');

const auth = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      throw new ErrorHandler(401, 'Please authenticate.');
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env['JWT_SECRET']);
    const user = await User.findOne({
      _id: decoded.id,
      'tokens.token': token,
    });
    if (!user) {
      throw new ErrorHandler(401, 'Please authenticate.');
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
