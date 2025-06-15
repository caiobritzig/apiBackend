const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const { swaggerUi, swaggerSpec } = require('./docs/swagger');

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;