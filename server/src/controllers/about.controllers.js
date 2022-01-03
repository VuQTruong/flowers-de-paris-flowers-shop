const AppError = require('../errors/app-error');
const About = require('../models/about.model');
const catchAsync = require('../utilities/catch-async.util');

exports.getAbout = catchAsync(async (req, res, next) => {
  const about = await About.findOne();

  if (!about) {
    return next(AppError.notFound('There is no About content'));
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
  const { id: aboutId } = req.params;

  const updatedAbout = await About.findByIdAndUpdate(aboutId, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    status: 'success',
    data: {
      about: updatedAbout,
    },
  });
});
