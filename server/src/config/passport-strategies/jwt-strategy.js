const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/user.model');

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PUBLIC_KEY,
  algorithms: ['RS256'],
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload._id });

    if (user) {
      // If found, send the user object to the next step to attach to req.user
      user.loginType = 'jwt';
      return done(null, user);
    } else {
      // If NOT found, reject with status code 401 - Unauthorized
      return done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
});

module.exports = strategy;
