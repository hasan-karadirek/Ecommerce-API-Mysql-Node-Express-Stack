const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes, Model } = require('sequelize');

class GuestCustomer extends Model {}

GuestCustomer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'GuestCustomer',
  }
);

module.exports = GuestCustomer;
