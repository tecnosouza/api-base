const express = require('express');
const router = express.Router();
const { authenticate } = require('@middleware/authMiddleware');
const categoryController = require('@controllers/categoryController');
const { createValidationCategory } = require('@middleware/categoryMiddleware');

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Rotas de categorias
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Registra uma nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Categoria registrada com sucesso.
 *       400:
 *         description: Erro de registro
 */
router.post('/category', authenticate, createValidationCategory(), categoryController.create);
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Retorna uma lista de categorias
 *     tags: [Categorias]
 *     parameters:
 *       - $ref: '#/components/parameters/PaginationParameters'
 *       - $ref: '#/components/parameters/LimitParameters'
 *       - $ref: '#/components/parameters/OrderByParameters'
 *       - $ref: '#/components/parameters/FiltersParameters'
 *       - $ref: '#/components/parameters/ColumnsParameters'
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/category', authenticate, categoryController.getAll);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Retorna uma categoria pelo ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria retornada com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/category/:id', authenticate, categoryController.getById);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Atualiza uma categoria pelo ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso.
 *       400:
 *         description: Erro de validação.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro do servidor.
 */
router.put('/category/:id', authenticate, categoryController.update);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Exclui uma categoria pelo ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Categoria
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro do servidor.
 */
router.delete('/category/:id', authenticate, categoryController.delete);

/**
 * Rota publica para o site popular
 */
router.get('/category-site', categoryController.getSite);

module.exports = router;
