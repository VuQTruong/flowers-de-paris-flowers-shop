const express = require('express');
const AppError = require('../../errors/app-error');
const User = require('../../models/user.model');
const catchAsync = require('../../utilities/catch-async.util');
const { signJWT } = require('../../utilities/jwt.util');
const { body, oneOf, check } = require('express-validator');
const validateRequest = require('../../middlewares/validate-request');
const router = express.Router();

const validations = [
  oneOf([check('email').exists()]),
  body('email').isString().isEmail().withMessage('Invalid email format'),
];

router.post(
  '/signup',
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const { email, phone, password, name } = req.body;

    // Check for existing email
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return next(AppError.badRequest('Email is already registered'));
    }

    // Check for exisiting phone number
    const existingPhoneNo = await User.findOne({ phone: phone });
    if (existingPhoneNo) {
      return next(AppError.badRequest('Phone number is already registered'));
    }

    const userInfo = {
      email,
      phone,
      name,
      password,
      isAdmin: false,
    };

    const newUser = await User.create(userInfo);

    const token = signJWT(
      {
        _id: newUser._id,
        name: newUser.name,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_EXPIRES_IN
    );

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      // secure: true,
      httpOnly: true,
    });

    return res.status(201).json({
      status: 'success',
      data: {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          isAdmin: newUser.isAdmin,
        },
      },
    });
  })
);

module.exports = router;
