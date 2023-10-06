module.exports = {
  swaggerDefinition: {
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Documentation for my API',
    },
    basePath: '/',
  },
  apis: ['./routers/*.js'], // Specify the path to your route files
  securityDefinitions: {},
  // Define empty security array to remove the authentication requirement from endpoints
  security: [],
};
