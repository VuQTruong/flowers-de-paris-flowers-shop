const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validate-request');
const About = require('../../models/about.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const validations = [
  body('content').isString().notEmpty().withMessage('Content must not empty'),
];

router.patch(
  '/:id',
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const { id: aboutId } = req.params;

    const updatedAbout = await About.findByIdAndUpdate(aboutId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: 'success',
      data: {
        about: updatedAbout,
      },
    });
  })
);

module.exports = router;
