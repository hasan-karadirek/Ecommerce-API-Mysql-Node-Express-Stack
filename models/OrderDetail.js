// OrderDetail.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../helpers/database/connectDatabase.js');

class OrderDetail extends Model {}

OrderDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderDetail',
  }
);

module.exports = OrderDetail;
