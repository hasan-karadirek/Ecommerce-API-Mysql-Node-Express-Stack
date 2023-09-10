const Product = require('../../models/Product');
const ProductImage = require('../../models/ProductImage');
const {
  searchHelper,
  productSortHelper,
  paginationHelper,
} = require('./queryMiddlewareHelpers');
const asyncHandler = require('express-async-handler');

const productQueryMiddleware = function (model) {
  return asyncHandler(async function (req, res, next) {
    const searchOption = searchHelper(req);
    const order = productSortHelper(req);
    const paginationResult = await paginationHelper(Product, req, searchOption);
    let products = await model.findAll({
      where: searchOption,
      include: [
        {
          model: ProductImage,
        },
      ],
      order: order,
      offset: paginationResult.startIndex,
      limit: paginationResult.limit,
    });

    res.queryResults = {
      productCount: paginationResult.total,
      pagination: paginationResult.pagination,
      products: products,
    };
    next();
  });
};

module.exports = productQueryMiddleware;
