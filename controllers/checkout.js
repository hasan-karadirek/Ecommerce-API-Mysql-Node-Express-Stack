const asyncHandlerWrapper = require('express-async-handler');
const { checkoutHelper } = require('../helpers/checkout/checkoutHelpers');
const { paymentHelper } = require('../helpers/payment/paymentHelper');
const { createMollieClient } = require('@mollie/api-client');





const checkout = asyncHandlerWrapper(async (req, res, next) => {
  const order = await checkoutHelper(req);

  const redirectUrl = await paymentHelper(
    order,
    req.body.paymentMethod,
    req.body.returnUrl
  );
  return res.status(201).json({
    order: order,
    redirectUrl: redirectUrl,
  });
});
const mollieHook = asyncHandlerWrapper(async (req, res, next) => {
  const mollieClient = createMollieClient({ apiKey: 'test_umHdbe7aa95UhukkzWtWUneE3Ftn7q' });
  const payment = await mollieClient.payments.get(req.body.id);
  
  console.log(payment,"pay")
  
  return res.status(200);
});

module.exports = { checkout, mollieHook };
