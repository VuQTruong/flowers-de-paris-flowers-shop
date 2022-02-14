const express = require('express');
const LayoutConfig = require('../../../models/layout-config.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

router.get(
  '/layout',
  catchAsync(async (req, res, next) => {
    const layout = await LayoutConfig.find();

    return res.status(200).json({
      status: 'success',
      message: 'Retrieve layout config successfully',
      data: {
        layout,
      },
    });
  })
);

module.exports = router;
