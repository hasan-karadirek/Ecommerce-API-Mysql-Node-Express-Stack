const CustomError = require('../helpers/error/CustomError.js');
const Customer = require('../models/Customer.js');
const asyncHandlerWrapper = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../helpers/libraries/sendEmail.js');
const { Op } = require('sequelize');

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
const forgotPassword = asyncHandlerWrapper(async (req, res, next) => {
  const { email } = req.body;
  const customer = await Customer.findOne({ where: { email: email } });

  if (!customer)
    return next(
      new CustomError('No account found with the email provided', 404)
    );
  const resetPasswordToken = customer.generateResetPasswordToken();
  const resetPasswordLink = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

  const emailTemplate = String.raw`
    <h3>Reset Your Password</h3>
    <p>This <a href=${resetPasswordLink} target="_blank">link</a> will expire in 1 hour</p>
    `;
  const { RESET_PASSWORD_EXPIRE } = process.env;
  customer.resetPasswordToken = resetPasswordToken;
  customer.resetPasswordExpire =
    Date.now() + parseInt(RESET_PASSWORD_EXPIRE) * 1000;
  await customer.save();
  try {
    await sendEmail({
      from: process.env.SMTP_USER,
      to: customer.email,
      subject: 'Reset Password',
      html: emailTemplate,
    });

    return res.status(200).json({
      message: 'Mail sent',
    });
  } catch (err) {
    customer.resetPasswordToken = undefined;
    customer.resetPasswordExpire = undefined;

    await customer.save();

    return next(new CustomError(`Email could not be sent" ${err}`, 500));
  }
});
const resetpassword = asyncHandlerWrapper(async (req, res, next) => {
  const { resetPasswordToken } = req.query;
  const { newPassword } = req.body;
  if (!resetPasswordToken)
    return next(
      new Customer('Please provide a valid token in your request params', 401)
    );
  let customer = await Customer.findOne({
    where: {
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { [Op.gt]: Date.now() },
    },
    attributes: { include: ['password'] },
  });

  if (!customer) {
    return next(
      new CustomError('There is no customer associated with this token', 404)
    );
  }

  customer.password = newPassword;
  customer.resetPasswordExpire = null;
  customer.resetPasswordToken = null;
  await customer.save();
  return res.status(200).json({
    message: 'Customer password changed successfully',
  });
});
module.exports = { register, login, logout, forgotPassword, resetpassword };
