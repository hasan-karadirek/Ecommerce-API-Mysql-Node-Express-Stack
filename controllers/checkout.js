const asyncHandlerWrapper = require('express-async-handler');
const { checkoutHelper } = require('../helpers/checkout/checkoutHelpers');
const { paymentHelper } = require('../helpers/payment/paymentHelper');
]const Order = require('../models/Order');
const CustomError = require('../helpers/error/CustomError');
const { JWT_COOKIE } = process.env;

const checkout = asyncHandlerWrapper(async (req, res, next) => {
  const order = await checkoutHelper(req);

  const redirectUrl = await paymentHelper(
    order,
    req.body.paymentMethod,
    req.body.returnUrl
  );

  return res
    .status(201)
    .cookie('orderInProcess', order, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: false,
    })
    .json({
      success: true,
      order: order,
      redirectUrl: redirectUrl,
    });
});
const mollieHook = asyncHandlerWrapper(async (req, res, next) => {
  const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY,
  });
  const payment = await mollieClient.payments.get(req.body.id);
  //change id:payment.id also add other payment status conditions
  const order = await Order.find({ where: { id: payment.id } });
  if (
    payment.status === 'paid' ||
    payment.status === 'failed' ||
    payment.status === 'canceled' ||
    payment.status === 'expired'
  ) {
    await order.update({
      order_status: 'closed',
      payment_status: payment.status,
    });
  }

  return res.status(200);
});
const getOrderStatus = asyncHandlerWrapper(async (req, res, next) => {
  const { orderId } = req.params;

  if (!orderId) {
    next(new CustomError('Please provide an order ID in params', 400));
  }

  const order = await Order.findOne({ where: { id: orderId } });

  if (!order) {
    next(
      new CustomError('There is no order associated with this order ID', 404)
    );
  }

  return res
    .status(200)
    .cookie('order', order, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: false,
    })
    .json({
      success: true,
      order: order,
    });
});
module.exports = { checkout, mollieHook, getOrderStatus };
