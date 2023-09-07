const CustomError = require('../helpers/error/CustomError.js');
const asyncHandlerWrapper = require('express-async-handler');
const Product = require('../models/Product.js');
const Category = require('../models/Category.js');
const ProductImage = require('../models/ProductImage.js');

const addProduct = asyncHandlerWrapper(async (req, res, next) => {
  const { name, description, price, images, categories } = req.body;
  console.log(categories, 'catcat');
  const newProduct = await Product.create({
    name: name,
    description: description,
    price: price,
    Images: [...images],
  });
  await newProduct.addCategories([1, 2, 3]);
  await newProduct.save();
  const prdc = await Product.findOne({
    where: { id: newProduct.id }, // Add any other conditions you need
    include: [
      {
        model: Category,
        through: 'Product_categories', // This is necessary due to the many-to-many relationship
      },
      {
        model: ProductImage,
      },
    ],
  });
  return res.status(201).json({
    product: newProduct,
    prdc: prdc,
  });
});

module.exports = { addProduct };
