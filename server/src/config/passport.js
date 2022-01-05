const jwtStrategy = require('./passport-strategies/jwt-strategy');

module.exports = (passport) => {
  passport.use(jwtStrategy);
};
