const asyncHandlerWrapper = require('express-async-handler');
const { Sequelize } = require('sequelize');
const CustomError = require('../error/CustomError');
const OrderDetail = require('../../models/OrderDetail');

const addToCartHelper = asyncHandlerWrapper(async (req) => {
  let order = req.order;
  const { productId, quantity } = req.body;
  await order.addProduct(productId, {
    through: { quantity: Sequelize.literal(`quantity + ${quantity}`) },
  });
  await order.reload();
  await order.save();

  return order;
});
const removeFromCartHelper = asyncHandlerWrapper(async (req, next) => {
  const { productId, quantity } = req.body;
  let order = req.order;
  const item = order.Products.filter((product) => product.id === productId);
  if (item.length === 0) {
    next(new CustomError("This item already doesn't exist in this cart!", 400));
  }
  order.Products.forEach(
    asyncHandlerWrapper(async (product) => {
      if (product.id === productId) {
        const index = order.Products.indexOf(product);
        if (product.OrderDetail.quantity <= quantity) {
          //IDK why like this:) just worked this way. Issue is related count cart_total, and what returns at the end of response
          order.Products.splice(index, 1);
          await OrderDetail.destroy({
            where: { orderId: order.id, productId: productId },
          });
        } else {
          await order.Products[index].OrderDetail.update({
            quantity: product.OrderDetail.quantity - quantity,
          });
        }
      }
    })
  );
  await order.save();
  return order;
});

module.exports = { addToCartHelper, removeFromCartHelper };
