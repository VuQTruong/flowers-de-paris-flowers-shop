const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const isAdmin = require('../../middlewares/is-admin');
const catchAsync = require('../../utilities/catch-async.util');
const About = require('../../models/about.model');
const { param } = require('express-validator');
const validateRequest = require('../../middlewares/validate-request');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const aboutId = req.params.id;
    await About.findByIdAndDelete(aboutId);

    return res.status(200).json({
      status: 'success',
      message: 'About Us item deleted',
    });
  })
);

module.exports = router;
