const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes, Model } = require('sequelize');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Category',
  }
);
// const Category = sequelize.define('Category', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//     unique: true,
//   },
//   name: {
//     type: DataTypes.STRING(50),
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//   },
//   slug: {
//     type: DataTypes.STRING,
//   },
// });
// Category.associate = (models) => {
//   Category.belongsToMany(models.Product, {
//     foreignKey: 'CategoryId',
//   });
// };
// Category.belongsToMany(Product, {
//   foreignKey: 'CategoryId',
// });
module.exports = Category;
