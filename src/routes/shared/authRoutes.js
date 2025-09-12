const express = require('express');
const router = express.Router();
const authController = require('@controllers/authController');
const { registerValidationRules, loginValidationRules } = require('@middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Autenticações
 *   description: Rotas de autenticação de usuário
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica uma pessoa e retorna um token JWT
 *     tags: [Autenticações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/auth/login', loginValidationRules(), authController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra uma novo usuário
 *     tags: [Autenticações]
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
router.post('/auth/register', registerValidationRules(), authController.register);

module.exports = router;
