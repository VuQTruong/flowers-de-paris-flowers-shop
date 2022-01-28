const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const isAdmin = require('../../middlewares/is-admin');
const catchAsync = require('../../utilities/catch-async.util');
const validateRequest = require('../../middlewares/validate-request');
const { oneOf, check, body } = require('express-validator');
const AppError = require('../../errors/app-error');
const User = require('../../models/user.model');
const router = express.Router();

const validations = [
  oneOf([
    check('email')
      .if((value, { req }) => req.user.googleId || req.user.facebookId)
      .exists(),
    check('phone')
      .if((value, { req }) => req.user.googleId || req.user.facebookId)
      .exists(),
    check('password').exists(),
    check('name').exists(),
    check('address').exists(),
    check('gender').exists(),
    check('dateOfBirth').exists(),
  ]),
  body('email').isEmail().optional().normalizeEmail(),
  body('phone').isString().optional(),
  body('password').isString().optional(),
];

router.patch(
  '/',
  isAuth,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const userId = req.user._id;

    // !User is not allow to change email or phone number if signed in with email or phone number
    if (req.user.loginType === 'jwt') {
      if (req.body.email || req.body.phone) {
        return next(
          AppError.badRequest(
            'You are not allow to change your email or phone number'
          )
        );
      }
    }

    const { isAdmin, isActive, googleId, facebookId, ...updateInfo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateInfo, {
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
