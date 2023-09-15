const express = require('express');
const {
  addProduct,
  getSingleProductById,
  getSingleProductBySlug,
  getAllProducts,
  editProduct,
} = require('../controllers/product');
const {
  checkProductExist,
} = require('../middlewares/database/databaseErrorHandler');
const productQueryMiddleware = require('../middlewares/query/productQueryMiddleware');
const Product = require('../models/Product');
const router = express.Router();
//add admin mid
router.post('/add', addProduct);
// after customer review feature, add reviewer pagination middleware
router.get('/id/:id', checkProductExist, getSingleProductById);
router.get('/:slug', checkProductExist, getSingleProductBySlug);
router.get('/', productQueryMiddleware(Product), getAllProducts);
router.put('/:id/edit', checkProductExist, editProduct);

module.exports = router;
