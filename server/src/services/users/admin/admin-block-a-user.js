const express = require('express');
const { param } = require('express-validator');
const AppError = require('../../../errors/app-error');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const User = require('../../../models/user.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.patch(
  '/block/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(AppError.notFound('Sorry, we cannot find the user'));
    }

    user.isActive = !user.isActive;
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: `User's status is set successfully`,
      data: {
        user,
      },
    });
  })
);

module.exports = router;
