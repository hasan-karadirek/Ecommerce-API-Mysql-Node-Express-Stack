const asyncHandlerWrapper = require('express-async-handler');
const {
  addToCartHelper,
  removeFromCartHelper,
} = require('../helpers/cart/cartHelpers');

const addToCart = asyncHandlerWrapper(async (req, res, next) => {
  const order = await addToCartHelper(req);

  return res.status(201).json({
    order: order,
  });
});

const removeFromCart = asyncHandlerWrapper(async (req, res, next) => {
  const order = await removeFromCartHelper(req, next);

  return res.status(201).json({
    order: order,
  });
});

module.exports = { addToCart, removeFromCart };
