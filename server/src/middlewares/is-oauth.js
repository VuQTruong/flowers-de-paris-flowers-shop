const AppError = require('../errors/app-error');

const isOAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(AppError.unauthorized('Please sign in to access the resource'));
  }
};

module.exports = isOAuth;
