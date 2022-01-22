const passport = require('passport');
const AppError = require('../errors/app-error');

const isAuth = (req, res, next) => {
  if (req.cookies['jwt']) {
    passport.authenticate('jwt', { session: false })(req, res, next);
  } else if (req.user) {
    next();
  } else {
    next(AppError.unauthorized('Please sign in to access the resource'));
  }
};

module.exports = isAuth;
