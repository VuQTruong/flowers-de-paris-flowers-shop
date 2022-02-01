const express = require('express');
const isAuth = require('../../../middlewares/is-auth.js');
const User = require('../../../models/user.model.js');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/favourites',
  isAuth,
  catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('favorites');

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve all favorites',
      data: {
        results: user.favorites.length,
        favorites: user.favorites,
      },
    });
  })
);

module.exports = router;
