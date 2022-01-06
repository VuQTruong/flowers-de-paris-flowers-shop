const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/user.model');

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
  passReqToCallback: true,
};

const strategy = new GoogleStrategy(
  options,
  async (req, accessToken, refreshToken, profile, done) => {
    // ? Call of successful authentication

    // Check if the user is already exist in the database by the google id
    const existingUser = await User.findOne({ googleId: profile.id }).catch(
      (error) => done(error, null)
    );

    if (existingUser) {
      // If yes, sign the user in by passing user data to Serialization step(serialize user into session)
      done(null, existingUser);
    } else {
      // If no, insert new user to the databases
      const userInfo = {
        email: profile.emails[0].value,
        isAdmin: false,
        name: profile.displayName,
        googleId: profile.id,
      };

      const newUser = await User.create(userInfo);

      // Pass user data to Serialization step
      done(null, newUser);
    }
  }
);

module.exports = strategy;
