const AppError = require('../errors/app-error');
const About = require('../models/about.model');
const catchAsync = require('../utilities/catch-async.util');

exports.getAbout = catchAsync(async (req, res, next) => {
  const about = await About.findOne({ _id: req.body.id });

  if (!about) {
    return next(AppError.notFound('Cannot find the content with provided id'));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      about,
    },
  });
});

exports.createAbout = catchAsync(async (req, res, next) => {
  const about = await About.create(req.body);

  return res.status(201).json({
    status: 'success',
    data: {
      about,
    },
  });
});

exports.updateAbout = catchAsync(async (req, res, next) => {
  const updatedAbout = await About.findByIdAndUpdate(
    req.body.id,
    {
      content: req.body.content,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    status: 'success',
    data: {
      about: updatedAbout,
    },
  });
});
