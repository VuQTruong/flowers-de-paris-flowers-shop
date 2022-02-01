const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const catchAsync = require('../../utilities/catch-async.util');
const validateRequest = require('../../middlewares/validate-request');
const { body } = require('express-validator');
const AppError = require('../../errors/app-error');
const User = require('../../models/user.model');
const validateFields = require('../../middlewares/validate-fields');
const router = express.Router();

const requireFields = [
  'email',
  'phone',
  'password',
  'name',
  'address',
  'gender',
  'dateOfBirth',
];

const validations = [
  body('email').isEmail().optional().normalizeEmail(),
  body('phone').isString().optional(),
  body('password').isString().optional(),
];

router.patch(
  '/',
  isAuth,
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const userId = req.user._id;

    // !User is not allow to change email or phone number if signed in with email or phone number
    // ?req.user.loginType is added in jwt-strategy and passport deserialize user. There are two types added: 'jwt' and 'oauth'
    if (req.user.loginType === 'jwt') {
      if (req.body.email || req.body.phone) {
        return next(
          AppError.badRequest(
            'You are not allow to change your email or phone number'
          )
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

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
