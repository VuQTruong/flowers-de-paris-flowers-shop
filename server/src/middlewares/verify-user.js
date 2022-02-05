const passport = require('passport');

const verifyUser = (req, res, next) => {
  if (req.cookies['jwt']) {
    passport.authenticate('jwt', { session: false })(req, res, next);
  }
  next();
};

module.exports = verifyUser;
