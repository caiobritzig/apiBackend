const express = require('express');
const app = express();
const routes = require('./routes');
const { swaggerUi, swaggerSpec } = require('./docs/swagger');

app.use(express.json());
app.use('/api', routes);

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;