const CustomError = require('../helpers/error/CustomError.js');
const { comparePassword } = require('../helpers/input/inputHelpers.js');
const Customer = require('../models/Customer.js');
const asyncHandlerWrapper = require('express-async-handler');
const bcrypt = require('bcryptjs');
const register = asyncHandlerWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    next(new CustomError('Please provide all required attributes.'));
  }

  const customer = await Customer.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  await customer.save();

  const { JWT_COOKIE } = process.env;
  const token = await customer.generateJwtFromCustomer();
  delete customer.dataValues.password;
  return res
    .status(201)
    .cookie('access_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: false,
    })
    .json({
      access_token: token,
      customer: customer,
    });
});

const login = asyncHandlerWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new CustomError('Please provide all required attributes.', 400));
  }
  const customer = await Customer.findOne({
    where: { email: email },
    attributes: { include: ['password'] },
  });
  if (!customer) {
    return next(new CustomError('User Credentials do not match.', 400));
  }

  if (!bcrypt.compareSync(password, customer.password)) {
    next(new CustomError('User Credentials do not match.', 400));
  }
  const token = customer.generateJwtFromCustomer();
  const { JWT_COOKIE } = process.env;
  delete customer.dataValues.password;
  return res
    .status(200)
    .cookie('access_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: false,
    })
    .json({
      access_token: token,
      customer: customer,
    });
});
const logout = asyncHandlerWrapper(async (req, res, next) => {
  console.log(req);
  return res
    .status(200)
    .cookie('access_token', '', {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: false,
    })
    .json({
      message: 'logged out',
    });
});
module.exports = { register, login, logout };
