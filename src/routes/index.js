const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const OrderController = require('../controllers/OrderController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   - name: Usuário
 *   - name: Produto
 *   - name: Categoria
 *   - name: Pedido
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: E-mail já cadastrado
 */
router.post('/register', UserController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retorna o perfil do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário
 *       401:
 *         description: Não autorizado
 */
router.get('/profile', auth, UserController.profile);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Atualiza o perfil do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil atualizado
 *       401:
 *         description: Não autorizado
 */
router.put('/profile', auth, UserController.updateProfile);

/**
 * @swagger
 * /profile:
 *   delete:
 *     summary: Exclui a conta do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conta excluída
 *       401:
 *         description: Não autorizado
 */
router.delete('/profile', auth, UserController.deleteAccount);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produto criado
 *       401:
 *         description: Não autorizado
 */
router.post('/product', auth, ProductController.create);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produto]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/product', ProductController.findAll);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/product/:id', ProductController.findOne);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put('/product/:id', auth, ProductController.update);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto excluído
 *       404:
 *         description: Produto não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/product/:id', auth, ProductController.delete);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada
 *       400:
 *         description: Nome da categoria é obrigatório
 *       401:
 *         description: Não autorizado
 */
router.post('/category', auth, CategoryController.create);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categoria]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
router.get('/category', CategoryController.findAll);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria atualizada
 *       404:
 *         description: Categoria não encontrada
 *       401:
 *         description: Não autorizado
 */
router.put('/category/:id', auth, CategoryController.update);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Exclui uma categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria excluída
 *       404:
 *         description: Categoria não encontrada
 *       400:
 *         description: Não é possível excluir a categoria pois existem produtos associados.
 *       401:
 *         description: Não autorizado
 */
router.delete('/category/:id', auth, CategoryController.delete);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Pedido criado
 *       401:
 *         description: Não autorizado
 */
router.post('/orders', auth, OrderController.create);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos do usuário autenticado
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       401:
 *         description: Não autorizado
 */
router.get('/orders', auth, OrderController.findByUser);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Busca um pedido pelo ID
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/orders/:id', auth, OrderController.findById);

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Cancela um pedido
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido cancelado
 *       401:
 *         description: Não autorizado
 */
router.delete('/order/:id', auth, OrderController.delete);

module.exports = router;