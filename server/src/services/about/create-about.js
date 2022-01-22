const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validate-request');
const About = require('../../models/about.model');
const catchAsync = require('../../utilities/catch-async.util');
const isAuth = require('../../middlewares/is-auth');
const isAdmin = require('../../middlewares/is-admin');
const router = express.Router();

const validations = [
  body('content').isString().notEmpty().withMessage('Content must not empty'),
];

router.post(
  '/',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const about = await About.create(req.body);

    return res.status(201).json({
      status: 'success',
      data: {
        about,
      },
    });
  })
);

module.exports = router;
