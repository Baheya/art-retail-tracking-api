const mongoose = require('mongoose');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  if (err instanceof mongoose.Error.CastError) {
    return res.status(404).json({ message: 'Could not find artwork.' });
  }
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
