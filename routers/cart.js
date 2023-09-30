const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart } = require('../controllers/cart');
const {
  checkOrderExist,
} = require('../middlewares/database/databaseErrorHandler');

router.post('/add', checkOrderExist, addToCart);
router.post('/remove', checkOrderExist, removeFromCart);
module.exports = router;
