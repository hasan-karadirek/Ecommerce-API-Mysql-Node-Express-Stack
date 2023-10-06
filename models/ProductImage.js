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

module.exports = ProductImage;
