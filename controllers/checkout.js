const asyncHandlerWrapper = require('express-async-handler');
const { checkoutHelper } = require('../helpers/checkout/checkoutHelpers');
const { paymentHelper } = require('../helpers/payment/paymentHelper');
import fetch from "node-fetch"

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
  const response=await fetch(`https://api.mollie.com/v2/payments/${req.body.id}`)
  console.log(response)
  
  return res.status(200);
});

module.exports = { checkout, mollieHook };
