const express = require('express');
const router = express.Router();

router.get('/signout', (req, res, next) => {
  // req.logOut();
  req.session = null;

  res.status(200).json({
    status: 'success',
    message: 'You are signed out',
  });
});

module.exports = router;
