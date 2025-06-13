const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const hash = await bcrypt.hash(password, 8);
    const user = await User.create({ name, email, password: hash });

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: userWithoutPassword });
  },

  async updateProfile(req, res) {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 8);

    await user.save();

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(200).json({ message: 'Perfil atualizado com sucesso!', user: userWithoutPassword });
  },

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  },

  async profile(req, res) {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(200).json(userWithoutPassword);
  },

  async deleteAccount(req, res) {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Conta excluída com sucesso!' });
  }
};