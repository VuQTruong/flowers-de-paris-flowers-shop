const express = require('express');
const isAuth = require('../../middlewares/is-auth');
const router = expres.Router();

router.get('/', isAuth, (req, res, next) => {});

module.exports = router;
