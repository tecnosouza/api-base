const express = require('express');
const router = express.Router();
// const { authenticate } = require('@middleware/authMiddleware');
// const errorLogController = require('@controllers/errorLogController');
// const { createValidationErrorLog } = require('@middleware/errorLogMiddleware');

// /**
//  * @swagger
//  * tags:
//  *   name: Logs de Erro
//  *   description: Rotas de logs de erro
//  */

// /**
//  * @swagger
//  * /errorLog:
//  *   post:
//  *     summary: Registra um novo log de erro
//  *     tags: [Logs de Erro]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/ErrorLogInput'
//  *     responses:
//  *       201:
//  *         description: Log de erro registrado com sucesso.
//  *       400:
//  *         description: Erro de registro
//  */
// router.post('/errorLog', authenticate, createValidationErrorLog(), errorLogController.create);
// /**
//  * @swagger
//  * /errorLog:
//  *   get:
//  *     summary: Retorna uma lista de logs de erro
//  *     tags: [Logs de Erro]
//  *     parameters:
//  *       - $ref: '#/components/parameters/PaginationParameters'
//  *       - $ref: '#/components/parameters/LimitParameters'
//  *       - $ref: '#/components/parameters/OrderByParameters'
//  *       - $ref: '#/components/parameters/FiltersParameters'
//  *       - $ref: '#/components/parameters/ColumnsParameters'
//  *     responses:
//  *       200:
//  *         description: Lista de logs de erro retornada com sucesso.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/errorLog', authenticate, errorLogController.getAll);

// /**
//  * @swagger
//  * /errorLog/{id}:
//  *   get:
//  *     summary: Retorna um log de erro pelo ID
//  *     tags: [Logs de Erro]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do log de erro
//  *     responses:
//  *       200:
//  *         description: Log de erro retornado com sucesso.
//  *       404:
//  *         description: Log de erro não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/errorLog/:id', authenticate, errorLogController.getById);

// /**
//  * @swagger
//  * /errorLog/{id}:
//  *   put:
//  *     summary: Atualiza um log de erro pelo ID
//  *     tags: [Logs de Erro]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do Log de Erro
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/ErrorLogInput'
//  *     responses:
//  *       200:
//  *         description: Log de erro atualizado com sucesso.
//  *       400:
//  *         description: Erro de validação.
//  *       404:
//  *         description: Log de erro não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.put('/errorLog/:id', authenticate, createValidationErrorLog(), errorLogController.update);

// /**
//  * @swagger
//  * /errorLog/{id}:
//  *   delete:
//  *     summary: Exclui um log de erro pelo ID
//  *     tags: [Logs de Erro]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do Log de Erro
//  *     responses:
//  *       200:
//  *         description: Log de erro excluído com sucesso.
//  *       404:
//  *         description: Log de erro não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.delete('/errorLog/:id', authenticate, errorLogController.delete);

module.exports = router;
