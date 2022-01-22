const express = require('express');
const isAuth = require('../../middlewares/is-auth');

const router = express.Router();

router.get('/verify', isAuth, (req, res, next) => {
  if (req.user) {
    return res.status(200).json({
      status: 'success',
      data: req.user,
    });
  }

  return res.status(401).json({
    message: 'fail',
    data: null,
  });
});

module.exports = router;
