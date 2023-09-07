const express = require('express');
const router = express.Router();
const product = require('./product.js');
const auth = require('./auth.js');
const category = require('./category.js');

router.use('/auth', auth);
router.use('/products', product);
router.use('/category', category);

router.get('/api/', async (req, res) => {
  return res.status(200).json({
    message: 'server is working',
  });
});
module.exports = router;
