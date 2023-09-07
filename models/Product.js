const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes, Model } = require('sequelize');
const Category = require('./Category.js');
const ProductImage = require('./ProductImage.js');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Product',
  }
);
// const Product = sequelize.define('Product', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//     unique: true,
//   },
//   name: {
//     type: DataTypes.STRING(250),
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//   },
//   price: {
//     type: DataTypes.DECIMAL,
//     allowNull: false,
//   },
//   slug: {
//     type: DataTypes.STRING,
//   },
// });

Product.belongsToMany(Category, {
  through: 'Product_categories',
  foreignKey: 'ProductId',
});
Category.belongsToMany(Product, {
  through: 'Product_categories',
  foreignKey: 'CategoryId',
});
Product.Images = Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

module.exports = Product;
