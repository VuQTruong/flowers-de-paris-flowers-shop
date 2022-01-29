const AppError = require('../errors/app-error');

const validateFields = (requiredFields) => {
  return (req, res, next) => {
    const keys = Object.keys(req.body);

    for (const key of keys) {
      if (!requiredFields.includes(key)) {
        next(
          AppError.badRequest(
            'Invalid request - One or more fields are missing'
          )
        );
      }
    }

    next();
  };
};

module.exports = validateFields;
