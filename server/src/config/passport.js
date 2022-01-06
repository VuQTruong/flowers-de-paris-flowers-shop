const jwtStrategy = require('./passport-strategies/jwt-strategy');
const googleStrategy = require('./passport-strategies/google-strategy');
const User = require('../models/user.model');

module.exports = (passport) => {
  passport.use(jwtStrategy);
  passport.use(googleStrategy);

  // Receive user data from a strategy (except jwt-strategy) and serialize userId into a session
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  // Deserialize a cookie-session attached in a request to get the payload that is encrypted in the cookie-session. In this case the payload includes the user id only
  // The id is used to find the corresponding user. If there is one, the user is attached to the req.user
  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ _id: id }).catch((error) => {
      console.log('Error Deserializing', error);
      done(error, null);
    });

    if (user) {
      return done(null, user);
    }
  });
};
