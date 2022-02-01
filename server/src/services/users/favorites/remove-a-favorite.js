const express = require('express');
const AppError = require('../../../errors/app-error');
const isAuth = require('../../../middlewares/is-auth');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

router.delete(
  '/favorites/:id',
  isAuth,
  catchAsync(async (req, res, next) => {
    const itemId = req.params.id;
    const user = req.user;

    if (!user.favorites.includes(itemId)) {
      return next(AppError.badRequest('Item does not exist in favorites list'));
    }

    user.favorites = user.favorites.filter((id) => {
      return String(id) !== String(itemId);
    });

    const updatedUser = await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Item is removed from the favorites',
      data: {
        user: updatedUser,
      },
    });
  })
);

module.exports = router;
