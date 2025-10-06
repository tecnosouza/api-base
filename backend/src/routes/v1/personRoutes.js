const express = require('express');
const router = express.Router();
const personController = require('@controllers/personController');
const { createValidationPerson } = require('@middleware/personMiddleware');

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Rotas de usuários
 */

/**
 * @swagger
 * /person:
 *   post:
 *     summary: Registra uma novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonInput'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 *       400:
 *         description: Erro de registro
 */
router.post('/person', createValidationPerson(), personController.create);
/**
 * @swagger
 * /person:
 *   get:
 *     summary: Retorna uma lista de usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornado com sucesso.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/person', personController.getAll);

/**
 * @swagger
 * /person/{id}:
 *   get:
 *     summary: Retorna um usuários pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da usuário
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/person/:id', personController.getById);

/**
 * @swagger
 * /person/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonInput'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       400:
 *         description: Erro de validação.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.put('/person/:id', createValidationPerson(), personController.update);

/**
 * @swagger
 * /person/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.delete('/person/:id', personController.delete);

module.exports = router;
