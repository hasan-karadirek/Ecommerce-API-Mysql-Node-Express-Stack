const {
  isTokenIncluded,
  verifyCustomerToken,
  isAdminTokenIncluded,
  verifyAdminToken,
} = require('../../helpers/authorization/tokenHelpers');
const jwt = require('jsonwebtoken');
const CustomError = require('../../helpers/error/CustomError');

const getAccessToRoute = (req, res, next) => {
  const token = isTokenIncluded(req);
  console.log(token, 'toke');
  if (!token) {
    next(
      new CustomError(
        'You do not have authorization to access this route.',
        401
      )
    );
  }
  const customer = verifyCustomerToken(token);
  console.log(customer, 'gole');
  if (!customer) {
    next(
      new CustomError(
        'You do not have authorization to access this route.',
        401
      )
    );
  }
  req.user = customer;
  next();
};
const getAccessToAdmin = (req, res, next) => {
  const adminToken = isAdminTokenIncluded(req);
  if (!adminToken) {
    next(new CustomError('You are not authorized to access this route', 401));
  }
  if (verifyAdminToken(adminToken)) {
    next(new CustomError('You are not authorized to access this route', 401));
  }

  next();
};

module.exports = { getAccessToRoute, getAccessToAdmin };
