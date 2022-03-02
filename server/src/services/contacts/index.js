const express = require('express');
const getAllContactsRouter = require('./get-all-contacts');
const adCreateContactRouter = require('./admin/admin-create-contact');
const adUpdateContactRouter = require('./admin/admin-update-a-contact');
const adDeleteContactRouter = require('./admin/admin-delete-a-contact');
const adGetContactRouter = require('./admin/admin-get-a-contact');
const contactRouter = express.Router();

contactRouter.use(adCreateContactRouter);
contactRouter.use(adGetContactRouter);
contactRouter.use(adUpdateContactRouter);
contactRouter.use(adDeleteContactRouter);

contactRouter.use(getAllContactsRouter);

module.exports = contactRouter;
