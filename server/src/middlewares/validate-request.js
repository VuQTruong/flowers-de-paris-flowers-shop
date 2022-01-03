const { validationResult } = require('express-validator');
const AppError = require('../errors/app-error');

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error('💥💥💥 Validation Errors', errors.errors);

    return next(
      AppError.badRequest('Invalid Request - One or more fields are invalid')
    );
  }

  next();
};
