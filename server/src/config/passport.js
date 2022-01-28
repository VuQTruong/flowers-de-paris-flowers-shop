const jwtStrategy = require('./passport-strategies/jwt-strategy');
const googleStrategy = require('./passport-strategies/google-strategy');
const facebookStrategy = require('./passport-strategies/facebook-strategy');
const User = require('../models/user.model');

module.exports = (passport) => {
  passport.use(jwtStrategy);
  passport.use(googleStrategy);
  passport.use(facebookStrategy);

  // Receive user data from a strategy (except jwt-strategy) and serialize userId into a session before sending as a cookie-session to a user
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  // Deserialize a cookie-session attached in a request to get the payload that is encrypted in the cookie-session. In this case the payload includes the user id only
  // The id is used to find the corresponding user. If there is one, the user is attached to the req.user
  // When deserializing, the expiry time is also checked to ensure the session is still valid
  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ _id: id }).catch((error) => {
      console.log('Error Deserializing', error);
      done(error, null);
    });

    if (user) {
      user.loginType = 'oauth';
      return done(null, user);
    }
  });
};
