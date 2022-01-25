const express = require('express');
const createContactRouter = require('./create-contact');
const contactRouter = express.Router();

contactRouter.use(createContactRouter);

module.exports = contactRouter;
