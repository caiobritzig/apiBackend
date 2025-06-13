const { Category, Product } = require('../models');

module.exports = {
  async create(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
    }
    const category = await Category.create({ name });
    res.status(201).json({ message: 'Categoria criada com sucesso!', category });
  },

  async findAll(req, res) {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  },

  async update(req, res) {
    const { name } = req.body;
    const [updated] = await Category.update({ name }, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json({ message: 'Categoria atualizada com sucesso!', category: updatedCategory });
  },

  async delete(req, res) {
    const productsCount = await Product.count({ where: { categoryId: req.params.id } });
    if (productsCount > 0) {
      return res.status(400).json({ error: 'Não é possível excluir a categoria pois existem produtos associados.' });
    }

    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.status(200).json({ message: 'Categoria excluída com sucesso!' });
  }
};