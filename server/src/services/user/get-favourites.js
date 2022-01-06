const express = require('express');
const isOAuth = require('../../middlewares/is-oauth');
const isAuth = require('../../middlewares/is-authjs');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/favourites',
  isOAuth,
  isAuth,
  catchAsync(async (req, res, next) => {
    return res.status(200).json({
      status: 'success',
    });
  })
);

module.exports = router;
