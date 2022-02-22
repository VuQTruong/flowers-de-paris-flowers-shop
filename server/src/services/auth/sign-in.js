const express = require('express');
const User = require('../../models/user.model');
const catchAsync = require('../../utilities/catch-async.util');
const bcrypt = require('bcrypt');
const AppError = require('../../errors/app-error');
const { signJWT } = require('../../utilities/jwt.util');
const router = express.Router();

router.post(
  '/signin',
  catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    let userInfo;

    // Check if the username is exist or not
    if (isNaN(username)) {
      userInfo = await User.findOne({ email: username });
    } else {
      userInfo = await User.findOne({ phone: username });
    }

    if (userInfo) {
      // !Check if the user is blocked or not
      if (!userInfo.isActive) {
        return next(
          AppError.unauthorized(
            'Unable to sign in! Your account is inactivated!'
          )
        );
      }

      if (bcrypt.compareSync(password, userInfo.password)) {
        const token = signJWT(
          {
            _id: userInfo._id,
            // ?Consider ommiting the name and isAdmin if they are not used
            name: userInfo.name,
            isAdmin: userInfo.isAdmin,
          },
          process.env.JWT_EXPIRES_IN
        );

        res.cookie('jwt', token, {
          expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
          ),
          // secure: true,
          httpOnly: true,
        });

        return res.status(200).json({
          status: 'success',
          data: {
            user: userInfo,
          },
        });
      }
    }

    next(AppError.unauthorized('Email/Phone Number or Password is incorrect'));
  })
);

module.exports = router;
