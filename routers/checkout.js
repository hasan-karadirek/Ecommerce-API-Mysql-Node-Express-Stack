const express = require('express');
const router = express.Router();
const {
  checkout,
  mollieHook,
  getOrderStatus,
} = require('../controllers/checkout.js');
const {
  checkOrderExist,
} = require('../middlewares/database/databaseErrorHandler.js');
router.post('/', checkOrderExist, checkout);
router.post('/mollie-hook', mollieHook);
router.get('/thanks', (req, res) => {
  return res.status(200).json({
    message: 'thank you',
  });
});
router.get('/status/:orderId', getOrderStatus);

module.exports = router;
