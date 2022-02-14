const express = require('express');
const SlideConfig = require('../../../models/slide-config.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/slides',
  catchAsync(async (req, res, next) => {
    const slides = await SlideConfig.find({ isActive: true });

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve slides config successfully',
      data: {
        slides,
      },
    });
  })
);

module.exports = router;
