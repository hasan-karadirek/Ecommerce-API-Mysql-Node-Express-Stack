const express = require('express');
const router = express.Router();
const {
  addCategory,
  getSingleCategoryById,
} = require('../controllers/category.js');
const productQueryMiddleware = require('../middlewares/query/productQueryMiddleware.js');
const Product = require('../models/Product.js');
const {
  checkCategoryExist,
} = require('../middlewares/database/databaseErrorHandler.js');
const { getAccessToAdmin } = require('../middlewares/authorization/auth.js');
router.post('/add', getAccessToAdmin, addCategory);

router.get(
  '/id/:categoryId',
  [checkCategoryExist, productQueryMiddleware(Product)],
  getSingleCategoryById
);
router.get(
  '/:categorySlug',
  [checkCategoryExist, productQueryMiddleware(Product)],
  getSingleCategoryById
);
module.exports = router;
