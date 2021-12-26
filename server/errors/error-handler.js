const AppError = require('./app-error');

exports.errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
