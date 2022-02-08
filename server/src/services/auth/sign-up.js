const express = require('express');
const AppError = require('../../errors/app-error');
const User = require('../../models/user.model');
const catchAsync = require('../../utilities/catch-async.util');
const { signJWT } = require('../../utilities/jwt.util');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validate-request');
const validateFields = require('../../middlewares/validate-fields');
const router = express.Router();

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const requireFields = ['email', 'phone', 'password', 'name', 'reCaptchaToken'];

const validations = [
  body('email')
    .isString()
    .isEmail()
    .withMessage('Invalid email format')
    .optional()
    .normalizeEmail(),
  body('phone').isString().withMessage('Invalid phone number').optional(),
  body('password').isString().notEmpty().withMessage('Password is missing'),
  body('name').isString().optional(),
  body('reCaptchaToken')
    .isString()
    .notEmpty()
    .withMessage('reCaptchaToken is missing'),
];

router.post(
  '/signup',
  validateFields(requireFields),
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const { email, phone, password, name, reCaptchaToken } = req.body;

    const isHuman = await validateHuman(reCaptchaToken);

    // Verify if the one is submitting is a human
    if (!isHuman) {
      return res.status(400).json({
        status: 'fail',
        message: 'Sorry, you are not a human',
        data: null,
      });
    }

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
        user: newUser,
      },
    });
  })
);

async function validateHuman(reCaptchaToken) {
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${reCaptchaToken}`,
      {
        method: 'POST',
      }
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    return false;
  }
}

module.exports = router;
