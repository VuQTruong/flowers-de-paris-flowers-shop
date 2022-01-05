const express = require('express');
const AppError = require('../../errors/app-error');
const About = require('../../models/about.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const about = await About.findOne();

    if (!about) {
      return next(AppError.notFound('There is no About content'));
    }

    return res.status(200).json({
      status: 'success',
      data: {
        about,
      },
    });
  })
);

module.exports = router;
