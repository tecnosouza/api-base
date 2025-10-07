const express = require('express');
const router = express.Router();
const { authenticate } = require('@middleware/authMiddleware');
const accessController = require('@controllers/accessController');
const { createValidationAccess } = require('@middleware/accessMiddleware');

/**
 * @swagger
 * tags:
 *   name: Acessos
 *   description: Rotas de acessos
 */

/**
 * @swagger
 * /access:
 *   post:
 *     summary: Registra um novo acesso
 *     tags: [Acessos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccessInput'
 *     responses:
 *       201:
 *         description: Acesso registrado com sucesso.
 *       400:
 *         description: Erro de registro
 */
router.post('/access', authenticate, createValidationAccess(), accessController.create);
/**
 * @swagger
 * /access:
 *   get:
 *     summary: Retorna uma lista de acessos
 *     tags: [Acessos]
 *     parameters:
 *       - $ref: '#/components/parameters/PaginationParameters'
 *       - $ref: '#/components/parameters/LimitParameters'
 *       - $ref: '#/components/parameters/OrderByParameters'
 *       - $ref: '#/components/parameters/FiltersParameters'
 *       - $ref: '#/components/parameters/ColumnsParameters'
 *     responses:
 *       200:
 *         description: Lista de acessos retornada com sucesso.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/access', authenticate, accessController.getAll);

/**
 * @swagger
 * /access/{id}:
 *   get:
 *     summary: Retorna um acesso pelo ID
 *     tags: [Acessos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do acesso
 *     responses:
 *       200:
 *         description: Acesso retornado com sucesso.
 *       404:
 *         description: Acesso não encontrado.
 *       500:
 *         description: Erro do servidor.
 *       401:
 *         description: Não autorizado.
 */
router.get('/access/:id', authenticate, accessController.getById);

/**
 * @swagger
 * /access/{id}:
 *   put:
 *     summary: Atualiza um acesso pelo ID
 *     tags: [Acessos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Acesso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccessInput'
 *     responses:
 *       200:
 *         description: Acesso atualizado com sucesso.
 *       400:
 *         description: Erro de validação.
 *       404:
 *         description: Acesso não encontrado.
 *       500:
 *         description: Erro do servidor.
 *       401:
 *         description: Não autorizado.
 */
router.put('/access/:id', authenticate, createValidationAccess(), accessController.update);

/**
 * @swagger
 * /access/{id}:
 *   delete:
 *     summary: Exclui um acesso pelo ID
 *     tags: [Acessos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Acesso
 *     responses:
 *       200:
 *         description: Acesso excluído com sucesso.
 *       404:
 *         description: Acesso não encontrado.
 *       500:
 *         description: Erro do servidor.
 *       401:
 *         description: Não autorizado.
 */
router.delete('/access/:id', authenticate, accessController.delete);

module.exports = router;
