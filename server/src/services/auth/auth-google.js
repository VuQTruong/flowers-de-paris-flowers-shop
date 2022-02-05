const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    // successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL + '/oauth/fail',
    // failureMessage: 'Cannot sign in with Google',
  }),
  (req, res) => {
    // ? This is sent to the window that are being used to sign in to Google
    // res.send('Thank you for signing in');
    res.redirect(process.env.CLIENT_URL);
  }
);

module.exports = router;
