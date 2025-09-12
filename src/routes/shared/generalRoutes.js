// src/routes/shared/generalRoutes.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Gerais
 *   description: Rotas de status da api
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna a mensagem de boas-vindas da API
 *     tags: [Gerais]
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas da API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bem-vindo à API v1!
 */
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem-vindo à API v1!' });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica a saúde da API
 *     tags: [Gerais]
 *     responses:
 *       200:
 *         description: API está saudável
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: API está funcionando corretamente!
 */
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API está funcionando corretamente!' });
});

module.exports = router;
