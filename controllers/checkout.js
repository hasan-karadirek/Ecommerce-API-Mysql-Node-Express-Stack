const asyncHandlerWrapper = require('express-async-handler');
const { checkoutHelper } = require('../helpers/checkout/checkoutHelpers');
const { paymentHelper } = require('../helpers/payment/paymentHelper');

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
  const result=req.json()
  console.log("request",result,);
  
  return res.status(200);
});

module.exports = { checkout, mollieHook };
