const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const catchAsync = require('../../utilities/catch-async.util');
const validateRequest = require('../../middlewares/validate-request');
const { body } = require('express-validator');
const AppError = require('../../errors/app-error');
const User = require('../../models/user.model');
const validateFields = require('../../middlewares/validate-fields');
const router = express.Router();

const requireFields = ['avatar'];

const validations = [body('avatar').isString()];

router.patch(
  '/avatar',
  isAuth,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const { avatar } = req.body;

    const updatedUser = await User.findById(userId);

    updatedUser.avatar = avatar;
    await updatedUser.save();

    return res.status(200).json({
      status: 'success',
      message: 'User updated',
      data: {
        user: updatedUser,
      },
    });
  })
);

module.exports = router;
