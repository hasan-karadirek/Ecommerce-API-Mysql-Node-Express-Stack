const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./helpers/database/connectDatabase');
const app = express();
// Environment variables config
dotenv.config({ path: './config/env/config.env' });

//express json middleware
app.use(express.json());
// Mysql Database connection with sequelize
connectDatabase();

app.get('/api/', (req, res) => {
  return res.status(200).json({
    message: 'server is working',
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is started on PORT:${PORT}`);
});
