const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');
const Product = require('../models/Product');

module.exports = {
  async create(req, res) {
    const { products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Produtos são obrigatórios.' });
    }
    const order = await Order.create({ userId: req.userId });

    for (const productId of products) {
      await OrderProduct.create({ orderId: order.id, productId });
    }

    res.status(201).json({ message: 'Pedido criado com sucesso!', order });
  },

  async findByUser(req, res) {
    const orders = await Order.findAll({ where: { userId: req.userId } });
    res.status(200).json(orders);
  },

  async findById(req, res) {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.userId },
      include: [
        {
          model: Product,
          through: { attributes: [] }
        }
      ]
    });
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.status(200).json(order);
  },

  async delete(req, res) {
    const deleted = await Order.destroy({ where: { id: req.params.id, userId: req.userId } });
    if (!deleted) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.status(200).json({ message: 'Pedido cancelado' });
  }
};