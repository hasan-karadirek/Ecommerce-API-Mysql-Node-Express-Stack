const asyncHandlerWrapper = require('express-async-handler');
const Category = require('../models/Category.js');

const addCategory = asyncHandlerWrapper(async (req, res, next) => {
  const { name, description } = req.body;
  const newCategory = await Category.create({
    name: name,
    description: description,
  });
  await newCategory.save();
  return res.status(201).json({
    success: true,
    category: newCategory,
  });
});

const getSingleCategoryById = asyncHandlerWrapper(async (req, res, next) => {
  return res.status(200).json(res.queryResults);
});
module.exports = { addCategory, getSingleCategoryById };
