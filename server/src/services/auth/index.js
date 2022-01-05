const express = require('express');
const signInRouter = require('./sign-in');
const signOutRouter = require('./sign-out');
const signUpRouter = require('./sign-up');

const authRouter = express.Router();

authRouter.use(signUpRouter);
authRouter.use(signInRouter);
authRouter.use(signOutRouter);

module.exports = authRouter;
