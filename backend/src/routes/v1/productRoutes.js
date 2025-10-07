const express = require('express');
const router = express.Router();
const productController = require('@controllers/productController');
const { createValidationProduct } = require('@middleware/productMiddleware');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Rotas de produtos
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Registra um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Produto registrado com sucesso.
 *       400:
 *         description: Erro de registro
 */
router.post('/product', createValidationProduct(), productController.create);
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Retorna uma lista de produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/product', productController.getAll);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto retornado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/product/:id', productController.getById);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       400:
 *         description: Erro de validação.
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.put('/product/:id', createValidationProduct(), productController.update);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Exclui um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Produto
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso.
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.delete('/product/:id', productController.delete);

module.exports = router;
