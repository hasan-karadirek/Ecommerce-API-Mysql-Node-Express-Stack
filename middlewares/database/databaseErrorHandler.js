const CustomError = require('../../helpers/error/CustomError');
const asyncHandlerWrapper = require('express-async-handler');
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const ProductImage = require('../../models/ProductImage');

const checkProductExist = asyncHandlerWrapper(async (req, res, next) => {
  const { id, slug } = req.params;
  let whereOption;
  // At least one of id or slug should be exist
  if (!id && !slug) {
    next(new CustomError('Please Provide a product ID or SLUG!', 400));
  }
  if (id) {
    // check which paramater exist and create where:{} option
    whereOption = { id: id };
  } else {
    whereOption = { slug: slug };
  }

  const product = await Product.findOne({
    where: whereOption,
    include: [
      {
        model: Category,
        through: 'Product_categories',
      },
      {
        model: ProductImage,
      },
    ],
  });
  // throw error if there is no product with associated ID or SLUG
  if (!product) {
    return next(
      new CustomError(
        'The provided product ID or SLUG is not associated with any product.',
        404
      )
    );
  }
  //add product to response for avoiding execute multiple time a single query
  res.product = product;
  return next();
});

module.exports = { checkProductExist };
