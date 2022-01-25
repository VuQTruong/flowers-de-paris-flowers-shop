const express = require('express');
const AppError = require('../../errors/app-error');
const About = require('../../models/about.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const about = await About.find().sort({ $natural: -1 }).limit(1);

    if (!about) {
      return next(AppError.notFound('There is no About Us content'));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve the latest content from About Us',
      data: {
        about: about[0],
      },
    });
  })
);

module.exports = router;
