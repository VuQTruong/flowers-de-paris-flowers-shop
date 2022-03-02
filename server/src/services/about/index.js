const express = require('express');
const getAboutRouter = require('./get-about');
const adCreateAboutRouter = require('./admin/admin-create-about');
const adUpdateAboutRouter = require('./admin/admin-update-about');
const adDeleteAboutRouter = require('./admin/admin-delete-about');
const aboutRouter = express.Router();

aboutRouter.use(getAboutRouter);

aboutRouter.use(adCreateAboutRouter);
aboutRouter.use(adUpdateAboutRouter);
aboutRouter.use(adDeleteAboutRouter);

module.exports = aboutRouter;
