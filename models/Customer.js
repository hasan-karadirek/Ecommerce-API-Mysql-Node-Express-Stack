const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Customer = sequelize.define(
  'Customer',
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: {
        isAtLeast6Characters(value) {
          if (value.length < 6) {
            throw new Error('password must be at least 6 characters');
          }
        },
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
  }
);
Customer.prototype.generateJwtFromCustomer = () => {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  const payload = {
    id: this._id,
    name: this.name,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
  return token;
};
Customer.addHook('beforeSave', async (customer) => {
  if (customer.changed('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(customer.password, salt);
      customer.password = hash;
    } catch (error) {
      console.log(error);
    }
  }
});
module.exports = Customer;
