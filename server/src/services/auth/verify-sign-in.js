const express = require('express');
const verifyUser = require('../../middlewares/verify-user');

const router = express.Router();

router.get('/verify', verifyUser, (req, res, next) => {
  if (req.user) {
    return res.status(200).json({
      status: 'success',
      data: {
        user: req.user,
      },
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'User are not signing in',
    data: null,
  });
});

module.exports = router;
