const { Sequelize } = require('sequelize');

const { DATABASE, DB_USER, DB_PASS, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.log(`Database connection Error:${error.message}`);
  });

module.exports = sequelize;
