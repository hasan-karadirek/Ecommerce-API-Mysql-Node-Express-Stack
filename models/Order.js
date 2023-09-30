const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes, Model } = require('sequelize');
const Customer = require('./Customer.js');
const GuestCustomer = require('./GuestCustomer.js');
const Product = require('./Product.js');
const OrderDetail = require('./OrderDetail.js');
const Address = require('./Address.js');

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
    order_status: {
      type: DataTypes.STRING,
      defaultValue: 'open',
    },
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

Address.belongsTo(Order);
Order.hasMany(Address);
Customer.hasMany(Order);
GuestCustomer.hasMany(Order);
Order.belongsTo(Customer, { allowNull: true });
Order.belongsTo(GuestCustomer, { allowNull: true });

Order.belongsToMany(Product, {
  through: OrderDetail,
  foreignKey: 'OrderId',
});
Product.belongsToMany(Order, {
  through: OrderDetail,
  foreignKey: 'ProductId',
});

Order.addHook('beforeSave', async function (order) {
  if (order.Products) {
    let order_total = 0;
    order.Products.forEach((product) => {
      order_total += product.price * product.OrderDetail.quantity;
    });
    order.order_total = order_total;
  } else {
    order.order_total = 0;
  }
});
module.exports = Order;
