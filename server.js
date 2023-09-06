const dotenv = require('dotenv');
// Environment variables config
dotenv.config({ path: './config/env/config.env' });

const express = require('express');
const sequelize = require('./helpers/database/connectDatabase');
const Customer = require('./models/Customer');
const app = express();

//express json middleware
app.use(express.json());
//sync database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database synchronization completed.');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

app.get('/api/', async (req, res) => {
  const customer = await Customer.create({
    firstName: 'hasan',
    lastName: 'karadirek',
    email: 'hasankaradirek223@gmail.com',
    password: '123qwe123',
  });
  await customer.save();
  return res.status(200).json({
    message: 'server is working',
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is started on PORT:${PORT}`);
});
