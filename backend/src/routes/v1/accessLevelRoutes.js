const express = require('express');
const router = express.Router();
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
router.post('/accessLevel', createValidationAccessLevel(), accessLevelController.create);
/**
 * @swagger
 * /accessLevel:
 *   get:
 *     summary: Retorna uma lista de níveis de acesso
 *     tags: [Níveis de Acesso]
 *     responses:
 *       200:
 *         description: Lista de níveis de acesso retornada com sucesso.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/accessLevel', accessLevelController.getAll);

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
router.get('/accessLevel/:id', accessLevelController.getById);

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
router.put('/accessLevel/:id', createValidationAccessLevel(), accessLevelController.update);

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
router.delete('/accessLevel/:id', accessLevelController.delete);

module.exports = router;
