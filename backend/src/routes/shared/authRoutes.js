const express = require('express');
const router = express.Router();
const authController = require('@controllers/authController');
const { loginValidationRules } = require('@middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Autenticações
 *   description: Rotas de autenticação de usuário
 */

/**
 * @swagger
 * /login:
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
router.post('/login', loginValidationRules(), authController.login);

module.exports = router;
