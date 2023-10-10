const express = require('express');
const router = express.Router();
const product = require('./product.js');
const auth = require('./auth.js');
const category = require('./category.js');
const cart = require('./cart.js');
const checkout = require('./checkout.js');
const admin = require('./admin.js');
const customerDashboard = require('./customerDashboard.js');

router.use('/admin', admin);
router.use('/auth', auth);
router.use('/products', product);
router.use('/category', category);
router.use('/cart', cart);
router.use('/checkout', checkout);
router.use('/dashboard', customerDashboard);

router.get('/api/', async (req, res) => {
  return res.status(200).json({
    message: 'server is working',
  });
});
module.exports = router;
