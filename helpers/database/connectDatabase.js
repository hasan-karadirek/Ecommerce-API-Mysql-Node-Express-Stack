const { Sequelize } = require('sequelize');
const asyncHandlerWrapper = require('express-async-handler');

const connectDatabase = asyncHandlerWrapper(async () => {
  const { DATABASE, DB_USER, DB_PASS, DB_HOST, DB_DIALECT } = process.env;

  const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT,
  });

  await sequelize.authenticate();
  console.log('Database connection has been established successfully.');
});

module.exports = connectDatabase;
