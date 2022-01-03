const express = require('express');
const aboutRouter = express.Router();
const { body } = require('express-validator');
const aboutControllers = require('../controllers/about.controllers');
const { validateRequest } = require('../middlewares/validate-request');

const validations = [
  body('content').isString().notEmpty().withMessage('Content must not empty'),
];

aboutRouter
  .route('/')
  .get(aboutControllers.getAbout)
  .post(validations, validateRequest, aboutControllers.createAbout);

aboutRouter
  .route('/:id')
  .patch(validations, validateRequest, aboutControllers.updateAbout);

module.exports = aboutRouter;
