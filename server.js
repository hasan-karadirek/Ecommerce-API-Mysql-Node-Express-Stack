const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./config/swaggerConfig');
const path = require('path');

// Environment variables config
dotenv.config({ path: './config/env/config.env' });

const routers = require('./routers/index.js');

const sequelize = require('./helpers/database/connectDatabase');
const customErrorHandler = require('./middlewares/errors/customErrorHandler.js');
const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//express json middleware
app.use(express.json());
//cookie middleware
app.use(cookieParser());
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// Generate Swagger documentation
const specs = swaggerJsdoc(swaggerConfig);
// Serve Swagger documentation using Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// server image serve
app.get('/api/productImages/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'public', 'ff', imageName); // Replace with your image directory

  // Set the appropriate content type based on the image type
  res.setHeader('Content-Type', 'image/jpeg'); // Change the content type as needed

  // Send the image file as the response
  return res.sendFile(imagePath);
});
app.use('/api', routers);

// Error Handler
app.use(customErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is started on PORT:${PORT}`);
  //sync database
  // sequelize
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log('Database synchronization completed.');
  //   })
  //   .catch((error) => {
  //     console.error('Error synchronizing database:', error);
  //   });
});
