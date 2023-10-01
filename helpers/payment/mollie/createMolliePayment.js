const asyncHandlerWrapper = require('express-async-handler');
const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({
  apiKey: 'test_umHdbe7aa95UhukkzWtWUneE3Ftn7q',
});

const createMolliePayment = asyncHandlerWrapper(
  async (value, orderId, redirectUrl, webhook) => {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: value.toFixed(2),
      },
      description: `Order ${orderId}`,
      redirectUrl: redirectUrl,
      webhookUrl: webhook,
      metadata: {
        order_id: orderId,
      },
    });
    return payment;
  }
);

module.exports = createMolliePayment;
