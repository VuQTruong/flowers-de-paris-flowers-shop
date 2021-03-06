const express = require('express');
const { param } = require('express-validator');
const isAdmin = require('../../../middlewares/is-admin');
const isAuth = require('../../../middlewares/is-auth');
const validateRequest = require('../../../middlewares/validate-request');
const Contact = require('../../../models/contact.model');
const catchAsync = require('../../../utilities/catch-async.util');
const router = express.Router();

const validations = [param('id').isMongoId()];

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validations,
  validateRequest,
  catchAsync(async (req, res, next) => {
    const contactId = req.params.id;
    await Contact.findByIdAndDelete(contactId);

    return res.status(200).json({
      status: 'success',
      message: 'Contact deleted successfully',
    });
  })
);

module.exports = router;
