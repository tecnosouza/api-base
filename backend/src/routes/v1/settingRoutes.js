const express = require('express');
const router = express.Router();
const settingController = require('@controllers/settingController');
const { createValidationSetting } = require('@middleware/settingMiddleware');

/**
 * @swagger
 * tags:
 *   name: Configurações
 *   description: Rotas de configurações
 */

/**
 * @swagger
 * /setting:
 *   post:
 *     summary: Registra uma nova configuração
 *     tags: [Configurações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SettingInput'
 *     responses:
 *       201:
 *         description: Configuração registrada com sucesso.
 *       400:
 *         description: Erro de registro
 */
router.post('/setting', createValidationSetting(), settingController.create);
/**
 * @swagger
 * /setting:
 *   get:
 *     summary: Retorna uma lista de configurações
 *     tags: [Configurações]
 *     responses:
 *       200:
 *         description: Lista de configurações retornada com sucesso.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/setting', settingController.getAll);

/**
 * @swagger
 * /setting/{id}:
 *   get:
 *     summary: Retorna uma configuração pelo ID
 *     tags: [Configurações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da configuração
 *     responses:
 *       200:
 *         description: Configuração retornada com sucesso.
 *       404:
 *         description: Configuração não encontrada.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/setting/:id', settingController.getById);

/**
 * @swagger
 * /setting/{id}:
 *   put:
 *     summary: Atualiza uma configuração pelo ID
 *     tags: [Configurações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Configuração
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SettingInput'
 *     responses:
 *       200:
 *         description: Configuração atualizada com sucesso.
 *       400:
 *         description: Erro de validação.
 *       404:
 *         description: Configuração não encontrada.
 *       500:
 *         description: Erro do servidor.
 */
router.put('/setting/:id', createValidationSetting(), settingController.update);

/**
 * @swagger
 * /setting/{id}:
 *   delete:
 *     summary: Exclui uma configuração pelo ID
 *     tags: [Configurações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Configuração
 *     responses:
 *       200:
 *         description: Configuração excluída com sucesso.
 *       404:
 *         description: Configuração não encontrada.
 *       500:
 *         description: Erro do servidor.
 */
router.delete('/setting/:id', settingController.delete);

module.exports = router;
