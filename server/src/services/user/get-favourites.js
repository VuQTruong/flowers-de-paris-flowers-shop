const express = require('express');
const passport = require('passport');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/favourites',
  passport.authenticate('jwt', { session: false }),
  catchAsync(async (req, res, next) => {
    return res.status(200).json({
      status: 'success',
    });
  })
);

module.exports = router;
