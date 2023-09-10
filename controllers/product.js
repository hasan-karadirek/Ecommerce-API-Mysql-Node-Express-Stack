const CustomError = require('../helpers/error/CustomError.js');
const asyncHandlerWrapper = require('express-async-handler');
const Product = require('../models/Product.js');
const Category = require('../models/Category.js');
const ProductImage = require('../models/ProductImage.js');

const addProduct = asyncHandlerWrapper(async (req, res, next) => {
  const { name, description, price, images, categories } = req.body;
  //create product by provided infos
  const newProduct = await Product.create(
    {
      name: name,
      description: description,
      price: price,
      // also create product images by associated ProductImage table.
      ProductImages: images,
    },
    {
      // necessary for association
      include: [ProductImage],
    }
  );
  // add categories to product by existed category IDs through Product_categories injection table
  // belongToMany association creates addCategories method automatically (plural form of model name, category, categories)
  await newProduct.addCategories(categories);
  await newProduct.save();
  return res.status(201).json({
    product: newProduct,
  });
});

const getSingleProductById = asyncHandlerWrapper(async (req, res, next) => {
  return res.status(200).json({
    product: res.product,
  });
});

const getSingleProductBySlug = asyncHandlerWrapper(async (req, res, next) => {
  return res.status(200).json({
    product: res.product,
  });
});
const getAllQuestions = asyncHandlerWrapper(async (req, res, next) => {
  return res.status(200).json(res.queryResults);
});
const editProduct = asyncHandlerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, images, categories } = req.body;
  console.log(name, description, price, images, categories, 'kekeme');
  // const products=await Product.update({
  //   name:name,
  //   description:description,
  //   price:price,
  //   ProductImages:images,

  // },{

  //  // where:{id:id},

  // },)
  const product = await Product.findOne({
    where: { id: id },
    include: [ProductImage, Category],
  });
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  if (images && Array.isArray(images) && images.length > 0) {
    const imageObjects = images.map((image) => {
      image.productId = product.id;
      return image;
    });
    await ProductImage.bulkCreate(imageObjects);
    //product.addProductImages(imagePaths);
  }
  if (categories && Array.isArray(categories) && categories.length > 0) {
    product.setCategories(categories);
  }
  await product.save();
  return res.status(200).json({
    product: product,
  });
});

module.exports = {
  addProduct,
  editProduct,
  getSingleProductById,
  getSingleProductBySlug,
  getAllQuestions,
};
