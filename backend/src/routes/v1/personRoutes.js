const express = require('express');
const router = express.Router();
const personController = require('@controllers/personController');
const { createValidationPerson } = require('@middleware/personMiddleware');

/**
 * @swagger
 * tags:
 *   name: Pessoas
 *   description: Rotas de pessoas
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra uma novo usuário
 *     tags: [Pessoas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonInput'
 *     responses:
 *       201:
 *         description: Pessoa registrada com sucesso.
 *       400:
 *         description: Erro de registro
 */
router.post('/auth/register', createValidationPerson(), personController.register);

module.exports = router;
