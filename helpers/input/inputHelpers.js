const bcrypt = require('bcryptjs');
const CustomError = require('../error/CustomError');
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const cartInputHelper = (req, next) => {
  const { customerId, guestCustomerId, productId, quantity } = req.body;
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
  const {
    customerId,
    guestCustomerId,
    guestFirstName,
    guestLastName,
    guestEmail,
    address,
  } = req.body;
  if (!guestCustomerId && !customerId) {
    next(new CustomError('Please provide customerId or guestCustomerId', 400));
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
