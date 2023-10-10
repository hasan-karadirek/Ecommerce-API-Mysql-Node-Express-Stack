const { where } = require('sequelize');
const Category = require('../../models/Category');

const searchHelper = (req) => {
  const searchTerm = req.query.search;
  const searchOption = {};
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    searchOption['name'] = regex;
  }
  return searchOption;
};
const categoryHelper = (req) => {
  return !req.categoryId ? {} : { id: parseInt(req.categoryId) };
};

const productSortHelper = (req) => {
  let order = [['createdAt', 'DESC']];
  const sortKey = req.query.sortBy;
  if (sortKey === 'price-low-to-high') {
    order.append(['price', 'ASC']);
  }
  if (sortKey === 'price-high-to-low') {
    order.append(['price', 'DESC']);
  }
  return order;
};
const paginationHelper = async (model, req, searchOption, categoryOption) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const pagination = {};
  const option = {};
  let include = [];
  categoryOption.id
    ? include.push({
        model: Category,
        through: 'Product_categories',
        where: categoryOption,
      })
    : '';
  const totalProduct = await model.count({
    where: searchOption,
    include: include,
  });

  if (startIndex > 0) {
    pagination.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  if (endIndex < totalProduct) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }
  const result = {};
  result.pagination = pagination;
  result.startIndex = startIndex;
  result.endIndex = endIndex;
  result.total = totalProduct;
  result.limit = limit;
  return result;
};
module.exports = {
  productSortHelper,
  paginationHelper,
  searchHelper,
  categoryHelper,
};
