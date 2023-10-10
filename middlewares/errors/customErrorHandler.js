const CustomError = require('../../helpers/error/CustomError');

const customErrorHandler = (err, req, res, next) => {
  let customError = err;
  if (err.name === 'SequelizeUniqueConstraintError') {
    customError = new CustomError(err.errors[0].message, 400);
    if (
      err.errors[0].validatorKey === 'not_unique' &&
      err.errors[0].path === 'email'
    ) {
      customError = new CustomError(
        'This email address is already registered',
        400
      );
    }
  }
  if (err.name === 'SequelizeValidationError') {
    customError = new CustomError(err.errors[0].message, 400);
    if (err.errors[0].validatorKey === 'isEmail') {
      customError.message = 'Please provide a valid email';
    }
  }

  console.log(err.name, err);
  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || 'Internal Server Error',
  });
};

module.exports = customErrorHandler;
