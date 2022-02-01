const express = require('express');
const { body, param } = require('express-validator');
const isAdmin = require('../../middlewares/is-admin');
const isAuth = require('../../middlewares/is-auth');
const validateFields = require('../../middlewares/validate-fields');
const validateRequest = require('../../middlewares/validate-request');
const About = require('../../models/about.model');
const catchAsync = require('../../utilities/catch-async.util');
const router = express.Router();

const requireFields = ['content'];

const validations = [
  param('id').isMongoId(),
  body('content').isString().notEmpty().withMessage('Content must not empty'),
];

router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validateFields(requireFields),
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
      message: 'About Us content is updated',
      data: {
        about: updatedAbout,
      },
    });
  })
);

module.exports = router;
