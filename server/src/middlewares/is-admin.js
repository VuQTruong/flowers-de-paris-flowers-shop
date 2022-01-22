const AppError = require('../errors/app-error');

const isAdmin = (req, res, next) => {
  const { isAdmin } = req.user;

  if (isAdmin) {
    next();
  } else {
    next(AppError.forbidden('You are not allowed to access this resource'));
  }
};

module.exports = isAdmin;
