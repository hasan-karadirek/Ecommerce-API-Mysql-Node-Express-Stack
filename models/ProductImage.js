const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes, Model } = require('sequelize');
const Product = require('./Product.js');

class ProductImage extends Model {}

ProductImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    path: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'ProductImage',
  }
);
// const ProductImage = sequelize.define('ProductImage', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//     unique: true,
//   },
//   path: {
//     type: DataTypes.STRING,
//   },
// });
// ProductImage.belongsTo(Product);
module.exports = ProductImage;
