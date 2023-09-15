const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes, Model } = require('sequelize');
const Customer = require('./Customer.js');
const GuestCustomer = require('./GuestCustomer.js');
const Product = require('./Product.js');
const OrderDetail = require('./OrderDetail.js');

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    order_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

Customer.hasMany(Order);
Order.belongsTo(Customer);
Order.belongsTo(GuestCustomer);
Order.belongsToMany(Product, {
  through: OrderDetail,
  foreignKey: 'OrderId',
});
Product.belongsToMany(Order, {
  through: OrderDetail,
  foreignKey: 'ProductId',
});

module.exports = Order;
