const Product = require('../models/Product');

module.exports = {
  async create(req, res) {
    const { name, description, price, stock, categoryId } = req.body;
    if (!name || price == null || stock == null || !categoryId) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
    }
    const product = await Product.create({ name, description, price, stock, categoryId });
    res.status(201).json({ message: 'Produto criado com sucesso!', product });
  },

  async findAll(req, res) {
    const products = await Product.findAll();
    res.status(200).json(products);
  },

  async findOne(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json(product);
  },

  async update(req, res) {
    const [updated] = await Product.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    const updatedProduct = await Product.findByPk(req.params.id);
    res.status(200).json({ message: 'Produto atualizado com sucesso!', product: updatedProduct });
  },

  async delete(req, res) {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto excluído com sucesso!' });
  }
};