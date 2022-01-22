const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['profile'] })
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: process.env.CLIENT_URL,
    // failureRedirect: process.env.CLIENT_URL + '/signup/fail',
    failureMessage: 'Cannot sign in with Facebook',
  })
);

module.exports = router;
