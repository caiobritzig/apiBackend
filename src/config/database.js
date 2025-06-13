
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Conectado ao MySQL com Sequelize'))
  .catch(err => console.error('Erro de conexão:', err));

module.exports = sequelize;

sequelize.sync()
  .then(() => console.log('Tabelas sincronizadas com o banco de dados'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));