const express = require('express');
const router = express.Router();

router.get('/signout', (req, res, next) => {
  // Sign out OAuth
  req.logOut();
  // req.session = null;

  // Sign out JWT Auth
  if (req.cookies['jwt']) {
    res.clearCookie('jwt');
  }

  res.status(200).json({
    status: 'success',
    message: 'You are signed out',
  });
});

module.exports = router;
