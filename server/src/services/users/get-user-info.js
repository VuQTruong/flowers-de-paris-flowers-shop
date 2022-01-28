const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const router = express.Router();

router.get('/', isAuth, (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'Retrieve user successfully',
    data: {
      user: req.user,
    },
  });
});

module.exports = router;
