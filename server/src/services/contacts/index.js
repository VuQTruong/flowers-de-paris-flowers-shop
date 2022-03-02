const express = require('express');
const getAllContactsRouter = require('./get-all-contacts');
const adCreateContactRouter = require('./admin-create-contact');
const adUpdateContactRouter = require('./admin-update-a-contact');
const adDeleteContactRouter = require('./admin-delete-a-contact');
const adGetContactRouter = require('./admin-get-a-contact');
const contactRouter = express.Router();

contactRouter.use(adCreateContactRouter);
contactRouter.use(adGetContactRouter);
contactRouter.use(getAllContactsRouter);
contactRouter.use(adUpdateContactRouter);
contactRouter.use(adDeleteContactRouter);

module.exports = contactRouter;
