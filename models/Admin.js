const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = sequelize.define('Admin', {
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
});
Admin.prototype.generateJwtFromAdmin = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

  const payload = {
    id: this.id,
    name: this.email,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
  return token;
};
Admin.addHook('beforeSave', async (admin) => {
  if (admin.changed('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(admin.password, salt);
      admin.password = hash;
    } catch (error) {
      console.log(error);
    }
  }
});
module.exports = Admin;
