const jwt = require('jsonwebtoken');

exports.signJWT = (payload, expiresIn = '1d') => {
  return jwt.sign(payload, process.env.PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn,
  });
};

exports.verifyJWT = (token) => {
  return jwt.verify(token, process.env.PUBLIC_KEY);
};
