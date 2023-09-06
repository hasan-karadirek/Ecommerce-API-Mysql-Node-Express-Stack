const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const Customer = sequelize.define('Customer', {
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
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Customer.addHook('beforeSave', (Customer) => {
  if (Customer.changed('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.error(err);
      bcrypt.hash(Customer.password, salt, (err, hash) => {
        if (err) console.error(err);
        console.log(hash, this, 'hasalo');
        Customer.password = hash;
      });
    });
  }
});
module.exports = Customer;
