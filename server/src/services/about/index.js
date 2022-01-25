const express = require('express');
const createAboutRouter = require('./create-about');
const getAboutRouter = require('./get-about');
const updateAboutRouter = require('./update-about');
const deleteAboutRouter = require('./delete-about');
const aboutRouter = express.Router();

aboutRouter.use(getAboutRouter);
aboutRouter.use(createAboutRouter);
aboutRouter.use(updateAboutRouter);
aboutRouter.use(deleteAboutRouter);

module.exports = aboutRouter;
