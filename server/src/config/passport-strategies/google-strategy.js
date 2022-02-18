const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Cart = require('../../models/cart.model');
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
      // check if user is active or not
      if (!existingUser.isActive) {
        return done(null, null, {
          message: 'Unable to sign in! Your account is inactivated!',
        });
      }

      // If yes, sign the user in by passing user data to Serialization step(serialize user into session)
      done(null, existingUser);
    } else {
      // If no, insert a new user to the database

      // Assign a cart to the user
      const cart = await Cart.create({});

      const userInfo = {
        isAdmin: false,
        name: profile.displayName,
        googleId: profile.id,
        cart: cart._id,
      };

      const newUser = await User.create(userInfo).catch((error) => {
        return done(error, null);
      });

      // Pass user data to Serialization step
      done(null, newUser);
    }
  }
);

module.exports = strategy;
