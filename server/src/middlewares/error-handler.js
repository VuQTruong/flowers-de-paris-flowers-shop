const AppError = require('../errors/app-error');

exports.errorHandler = (error, req, res, next) => {
  console.error(`💥💥💥 ${error.stack}`);

  // general errors
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  // mongodb errors
  if (error.name === 'CastError') {
    return res.status(400).json({
      status: 'fail',
      message: `Invalid ${error.path}: ${error.value}`,
    });
  }

  if (error.name === 'ValidationError') {
    const errors = error.errors.map((item) => item.message);

    return res.status(400).json({
      status: 'fail',
      message: `Invalid input: ${errors.join('. ')}`,
    });
  }

  // Todo: handle duplicate value errors

  // unknown errors
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
