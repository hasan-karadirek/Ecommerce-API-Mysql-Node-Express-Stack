const asyncHandlerWrapper = require('express-async-handler');
const createMolliePayment = require('./mollie/createMolliePayment');

const paymentHelper = asyncHandlerWrapper(
  async (order, paymentMethod, returnUrl) => {
    // const returnUrl = 'http://localhost:5000/api/checkout/returnPayment';
    let redirectUrl;
    if (paymentMethod === 'mollie') {
      const webhook =
        `process.env.API_SERVER/api/checkout/mollie-hook`;

      redirectUrl = (
        await createMolliePayment(
          order.order_total,
          order.id,
          returnUrl,
          webhook
        )
      )._links.checkout.href;
    } else if (paymentMethod === 'adyen') {
      // do adyen payment.
    }

    return redirectUrl;
  }
);
module.exports = { paymentHelper };
