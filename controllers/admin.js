const asyncHandlerWrapper = require('express-async-handler');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const CustomError = require('../helpers/error/CustomError');

const adminLogin = asyncHandlerWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new CustomError('Please provide all required attributes.', 400));
  }
  const admin = await Admin.findOne({ where: { email: email } });
  if (!admin) {
    return next(new CustomError('Admin Credentials do not match.', 400));
  }

  if (!bcrypt.compareSync(password, admin.password)) {
    next(new CustomError('Admin Credentials do not match.', 400));
  }
  const token = admin.generateJwtFromAdmin();

  const { JWT_COOKIE } = process.env;
  return res
    .status(200)
    .cookie('admin_access_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: false,
    })
    .json({
      success: true,
      admin_access_token: token,
    });
});
const adminDashboard = asyncHandlerWrapper(async (req, res, next) => {
  return res.status(200).json({ success: true });
});

module.exports = { adminLogin, adminDashboard };
