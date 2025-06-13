const Category = require('./Category');
const Product = require('./Product');

// Relacionamento 1:N entre Categoria e Produto
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = { Category, Product };