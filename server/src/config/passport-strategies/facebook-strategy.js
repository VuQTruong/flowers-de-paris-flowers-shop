const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/user.model');

const options = {
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: '/api/auth/facebook/callback',
  passReqToCallback: true,
};

const strategy = new FacebookStrategy(
  options,
  async (req, accessToken, refreshToken, profile, done) => {
    // Check if the user is already exist in the database by facebook id
    const existingUser = await User.findOne({ facebookId: profile.id }).catch(
      (error) => done(error, null)
    );

    if (existingUser) {
      done(null, existingUser);
    } else {
      const userInfo = {
        isAdmin: false,
        name: profile.displayName,
        facebookId: profile.id,
      };

      const newUser = await User.create(userInfo).catch((error) =>
        done(error, null)
      );

      done(null, newUser);
    }
  }
);

module.exports = strategy;
