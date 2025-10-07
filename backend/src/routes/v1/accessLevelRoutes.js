const express = require('express');
const router = express.Router();
const { authenticate } = require('@middleware/authMiddleware');
const accessLevelController = require('@controllers/accessLevelController');
const { createValidationAccessLevel } = require('@middleware/accessLevelMiddleware');

/**
 * @swagger
 * tags:
 *   name: Níveis de Acesso
 *   description: Rotas de níveis de acesso
 */

/**
 * @swagger
 * /accessLevel:
 *   post:
 *     summary: Registra um novo nível de acesso
 *     tags: [Níveis de Acesso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccessLevelInput'
 *     responses:
 *       201:
 *         description: Nível de acesso registrado com sucesso.
 *       400:
 *         description: Erro de registro
 */
router.post('/accessLevel', authenticate, createValidationAccessLevel(), accessLevelController.create);
/**
 * @swagger
 * /accessLevel:
 *   get:
 *     summary: Retorna uma lista de níveis de acesso
 *     tags: [Níveis de Acesso]
 *     parameters:
 *       - $ref: '#/components/parameters/PaginationParameters'
 *       - $ref: '#/components/parameters/LimitParameters'
 *       - $ref: '#/components/parameters/OrderByParameters'
 *       - $ref: '#/components/parameters/FiltersParameters'
 *       - $ref: '#/components/parameters/ColumnsParameters'
 *     responses:
 *       200:
 *         description: Lista de níveis de acesso retornada com sucesso.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/accessLevel', authenticate, accessLevelController.getAll);

/**
 * @swagger
 * /accessLevel/{id}:
 *   get:
 *     summary: Retorna um nível de acesso pelo ID
 *     tags: [Níveis de Acesso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do nível de acesso
 *     responses:
 *       200:
 *         description: Nível de acesso retornado com sucesso.
 *       404:
 *         description: Nível de acesso não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/accessLevel/:id', authenticate, accessLevelController.getById);

/**
 * @swagger
 * /accessLevel/{id}:
 *   put:
 *     summary: Atualiza um nível de acesso pelo ID
 *     tags: [Níveis de Acesso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Nível de Acesso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccessLevelInput'
 *     responses:
 *       200:
 *         description: Nível de acesso atualizado com sucesso.
 *       400:
 *         description: Erro de validação.
 *       404:
 *         description: Nível de acesso não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.put('/accessLevel/:id', authenticate, createValidationAccessLevel(), accessLevelController.update);

/**
 * @swagger
 * /accessLevel/{id}:
 *   delete:
 *     summary: Exclui um nível de acesso pelo ID
 *     tags: [Níveis de Acesso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Nível de Acesso
 *     responses:
 *       200:
 *         description: Nível de acesso excluído com sucesso.
 *       404:
 *         description: Nível de acesso não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.delete('/accessLevel/:id', authenticate, accessLevelController.delete);

module.exports = router;
