const CustomError = require('../helpers/error/CustomError.js');
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
    category: newCategory,
  });
});
module.exports = { addCategory };
