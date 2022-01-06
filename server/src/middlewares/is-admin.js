const AppError = require('../errors/app-error');

exports.isAdmin = (req, res, next) => {
  const { isAdmin } = req.user;

  if (isAdmin) {
    next();
  } else {
    next(AppError.unauthorized('You are not allowed to access this resource'));
  }
};
