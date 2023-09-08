const express = require('express');
const dotenv = require('dotenv');
// Environment variables config
dotenv.config({ path: './config/env/config.env' });

const routers = require('./routers/index.js');

const sequelize = require('./helpers/database/connectDatabase');
const Customer = require('./models/Customer');
const customErrorHandler = require('./middlewares/errors/customErrorHandler.js');
const app = express();

//express json middleware
app.use(express.json());

//sync database
// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log('Database synchronization completed.');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing database:', error);
//   });

app.use('/api', routers);

// Error Handler
app.use(customErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is started on PORT:${PORT}`);
});
