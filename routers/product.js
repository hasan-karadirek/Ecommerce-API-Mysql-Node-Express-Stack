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
const { getAccessToAdmin } = require('../middlewares/authorization/auth');
const {
  productImagesUpload,
} = require('../middlewares/libraries/productImageUpload');

const router = express.Router();

router.post(
  '/add',
  [getAccessToAdmin, productImagesUpload.array('productImages', 10)],
  addProduct
);
router.get('/id/:id', checkProductExist, getSingleProductById);
router.get('/:slug', checkProductExist, getSingleProductBySlug);
router.get('/', productQueryMiddleware(Product), getAllProducts);
router.put('/:id/edit', [getAccessToAdmin, checkProductExist], editProduct);

module.exports = router;
