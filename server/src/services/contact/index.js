const express = require('express');
const createContactRouter = require('./create-contact');
const getContactRouter = require('./get-a-contact');
const getAllContactsRouter = require('./get-all-contacts');
const updateContactRouter = require('./update-a-contact');
const deleteContactRouter = require('./delete-a-contact');
const contactRouter = express.Router();

contactRouter.use(createContactRouter);
contactRouter.use(getContactRouter);
contactRouter.use(getAllContactsRouter);
contactRouter.use(updateContactRouter);
contactRouter.use(deleteContactRouter);

module.exports = contactRouter;
