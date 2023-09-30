const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes, Model } = require('sequelize');

class Address extends Model {}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    postcode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    street_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    house_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floor: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'The Netherlands',
    },
  },
  {
    sequelize,
    modelName: 'Address',
  }
);

module.exports = Address;
