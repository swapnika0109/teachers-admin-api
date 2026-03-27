const express = require('express');
const routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express'); // Move imports to top
const swaggerJsdoc = require('swagger-jsdoc');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 1. SWAGGER CONFIG (MUST BE ABOVE 404 HANDLER)
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Teacher Admin API',
      version: '1.0.0',
      description: 'API documentation for the Teacher-Admin system',
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
   apis: ['./routes/*.js', './controllers/*.js'], 
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 2. REGULAR ROUTES
app.get('/test', (req, res) => res.send('Server is alive!'));
app.use('/api', routes);

// 3. ERROR HANDLERS (MUST BE LAST)
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(`Triggered error : ${err.stack}`);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
});

module.exports = app;