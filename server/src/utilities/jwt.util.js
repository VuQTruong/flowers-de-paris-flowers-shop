const jwt = require('jsonwebtoken');

exports.signJWT = (payload, expiresIn = '1d') => {
  return jwt.sign(payload, process.env.PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn,
  });
};

// *Since JWT is implement by Passport.js, we don't need this function. jwt-strategy comes with this
exports.verifyJWT = (token) => {
  return jwt.verify(token, process.env.PUBLIC_KEY);
};
