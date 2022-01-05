const express = require('express');
const createAboutRouter = require('./create-about');
const getAboutRouter = require('./get-about');
const updateAboutRouter = require('./update-about');
const aboutRouter = express.Router();

aboutRouter.use(getAboutRouter);
aboutRouter.use(createAboutRouter);
aboutRouter.use(updateAboutRouter);

module.exports = aboutRouter;
