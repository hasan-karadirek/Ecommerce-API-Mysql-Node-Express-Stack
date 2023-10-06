const asyncHandlerWrapper = require('express-async-handler');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

const getCustomerDashboard = asyncHandlerWrapper(async (req, res, next) => {
  const user = await Customer.findOne({
    where: { id: req.user.id },
    include: [Order],
  });

  return res.status(200).json({
    success: true,
    user: user,
  });
});
module.exports = { getCustomerDashboard };
