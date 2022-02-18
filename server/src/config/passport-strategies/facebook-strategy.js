const FacebookStrategy = require('passport-facebook').Strategy;
const Cart = require('../../models/cart.model');
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
      // check if user is active or not
      if (!existingUser.isActive) {
        return done(null, null, {
          message: 'Unable to sign in! Your account is inactivated!',
        });
      }

      done(null, existingUser);
    } else {
      // Assign a cart to the user
      const cart = await Cart.create({});

      const userInfo = {
        isAdmin: false,
        name: profile.displayName,
        facebookId: profile.id,
        cart: cart._id,
      };

      const newUser = await User.create(userInfo).catch((error) =>
        done(error, null)
      );

      done(null, newUser);
    }
  }
);

module.exports = strategy;
