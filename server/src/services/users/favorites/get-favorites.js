const express = require('express');
const isAuth = require('../../../middlewares/is-auth.js');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/favourites',
  isAuth,
  catchAsync(async (req, res, next) => {
    const favorites = req.user.favorites;

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all favorites',
      data: {
        results: favorites.length,
        favorites,
      },
    });
  })
);

module.exports = router;
