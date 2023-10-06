const Category = require('../../models/Category');
const Product = require('../../models/Product');
const ProductImage = require('../../models/ProductImage');
const {
  searchHelper,
  productSortHelper,
  paginationHelper,
  categoryHelper,
} = require('./queryMiddlewareHelpers');
const asyncHandler = require('express-async-handler');

const productQueryMiddleware = function (model) {
  return asyncHandler(async function (req, res, next) {
    const searchOption = searchHelper(req);
    const categoryOption = categoryHelper(req);
    const order = productSortHelper(req);
    const paginationResult = await paginationHelper(
      Product,
      req,
      searchOption,
      categoryOption
    );

    let products = await model.findAll({
      where: searchOption,
      include: [
        {
          model: ProductImage,
        },
        {
          model: Category,
          through: 'Product_categories',
          where: categoryOption,
        },
      ],
      order: order,
      offset: paginationResult.startIndex,
      limit: paginationResult.limit,
    });

    res.queryResults = {
      success: true,
      productCount: paginationResult.total,
      pagination: paginationResult.pagination,
      products: products,
    };
    next();
  });
};

module.exports = productQueryMiddleware;
