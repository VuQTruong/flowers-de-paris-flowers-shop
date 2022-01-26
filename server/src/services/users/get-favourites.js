const express = require('express');
const isAuth = require('../../middlewares/is-auth.js');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/favourites',
  isAuth,
  catchAsync(async (req, res, next) => {
    return res.status(200).json({
      status: 'success',
    });
  })
);

module.exports = router;
