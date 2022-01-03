const express = require('express');
const aboutRouter = express.Router();
const aboutControllers = require('../controllers/about.controllers');

aboutRouter
  .route('/')
  .get(aboutControllers.getAbout)
  .post(aboutControllers.createAbout)
  .patch(aboutControllers.updateAbout);

module.exports = aboutRouter;
