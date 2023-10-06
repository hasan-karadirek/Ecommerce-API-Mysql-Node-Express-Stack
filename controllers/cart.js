const asyncHandlerWrapper = require('express-async-handler');
const {
  addToCartHelper,
  removeFromCartHelper,
} = require('../helpers/cart/cartHelpers');
const { JWT_COOKIE } = process.env;

const addToCart = asyncHandlerWrapper(async (req, res, next) => {
  const order = await addToCartHelper(req);

  return res
    .status(201)
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

const removeFromCart = asyncHandlerWrapper(async (req, res, next) => {
  const order = await removeFromCartHelper(req, next);

  return res
    .status(201)
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

module.exports = { addToCart, removeFromCart };
