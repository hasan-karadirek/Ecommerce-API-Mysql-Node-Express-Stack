const bcrypt = require('bcryptjs');
const CustomError = require('../error/CustomError');
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require('../authorization/tokenHelpers');
const jwt = require('jsonwebtoken');

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const cartInputHelper = (req, next) => {
  const access_token = req.cookies.access_token;
  let customerId;
  if (access_token) {
    const { JWT_SECRET_KEY } = process.env;
    jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
      if (err)
        return next(
          new CustomError('Your token does not match any customer', 401)
        );
      customerId = decoded.id;
    });
  }

  const { guestCustomerId, productId, quantity } = req.body;
  if (!productId || !quantity) {
    next(
      new CustomError('Please provide a productId or order quantity!!', 400)
    );
  }
  if (!customerId && !guestCustomerId) {
    next(
      new CustomError(
        'Please provide at least one of customerId or guestCustomerId',
        400
      )
    );
  }
  return true;
};
const checkoutInputHelper = (req, next) => {
  const access_token = req.cookies.access_token;
  let customerId;
  if (access_token) {
    const { JWT_SECRET_KEY } = process.env;
    jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
      if (err)
        return next(
          new CustomError('Your token does not match any customer', 401)
        );
      customerId = decoded.id;
    });
  }
  //controll address input
  const {
    guestCustomerId,
    guestFirstName,
    guestLastName,
    guestEmail,
    address,
  } = req.body;
  if (!guestCustomerId && !customerId) {
    next(
      new CustomError(
        'Please provide customer access token or guestCustomerId',
        400
      )
    );
  }
  if (guestCustomerId) {
    if (!guestFirstName || !guestLastName || !guestEmail) {
      next(
        new CustomError(
          'GuestCustomer should have first name, last name and email to checkout!',
          400
        )
      );
    }
  }
};

module.exports = { comparePassword, cartInputHelper, checkoutInputHelper };
