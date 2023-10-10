const asyncHandlerWrapper = require('express-async-handler');
const Address = require('../../models/Address');
const GuestCustomer = require('../../models/GuestCustomer');

const checkoutHelper = asyncHandlerWrapper(async (req) => {
  const { guestFirstName, guestLastName, guestEmail, address } = req.body;
  if (req.guestCustomer) {
    const guestCustomer = await GuestCustomer.findOne({
      where: { id: req.body.guestCustomerId },
    });
    await guestCustomer.update({
      firstName: guestFirstName,
      lastName: guestLastName,
      email: guestEmail,
    });
  }
  const order = req.order;
  const addressObj = await Address.create(address);
  await order.setAddress(addressObj.id);
  await order.update({ payment_status: 'pending' });
  await order.save();
  return order;
});

module.exports = { checkoutHelper };
