const express = require('express');
const router = express.Router();
// const { authenticate } = require('@middleware/authMiddleware');
// const emailNoteController = require('@controllers/emailNoteController');
// const { createValidationEmailNote } = require('@middleware/emailNoteMiddleware');

// /**
//  * @swagger
//  * tags:
//  *   name: Notas de Email
//  *   description: Rotas de notas de email
//  */

// /**
//  * @swagger
//  * /emailNote:
//  *   post:
//  *     summary: Registra uma nova nota de email
//  *     tags: [Notas de Email]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/EmailNoteInput'
//  *     responses:
//  *       201:
//  *         description: Nota de email registrada com sucesso.
//  *       400:
//  *         description: Erro de registro
//  */
// router.post('/emailNote', authenticate, createValidationEmailNote(), emailNoteController.create);
// /**
//  * @swagger
//  * /emailNote:
//  *   get:
//  *     summary: Retorna uma lista de notas de email
//  *     tags: [Notas de Email]
//  *     parameters:
//  *       - $ref: '#/components/parameters/PaginationParameters'
//  *       - $ref: '#/components/parameters/LimitParameters'
//  *       - $ref: '#/components/parameters/OrderByParameters'
//  *       - $ref: '#/components/parameters/FiltersParameters'
//  *       - $ref: '#/components/parameters/ColumnsParameters'
//  *     responses:
//  *       200:
//  *         description: Lista de notas de email retornada com sucesso.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/emailNote', authenticate, emailNoteController.getAll);

// /**
//  * @swagger
//  * /emailNote/{id}:
//  *   get:
//  *     summary: Retorna uma nota de email pelo ID
//  *     tags: [Notas de Email]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID da nota de email
//  *     responses:
//  *       200:
//  *         description: Nota de email retornada com sucesso.
//  *       404:
//  *         description: Nota de email não encontrada.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/emailNote/:id', authenticate, emailNoteController.getById);

// /**
//  * @swagger
//  * /emailNote/{id}:
//  *   put:
//  *     summary: Atualiza uma nota de email pelo ID
//  *     tags: [Notas de Email]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID da Nota de Email
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/EmailNoteInput'
//  *     responses:
//  *       200:
//  *         description: Nota de email atualizada com sucesso.
//  *       400:
//  *         description: Erro de validação.
//  *       404:
//  *         description: Nota de email não encontrada.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.put('/emailNote/:id', authenticate, createValidationEmailNote(), emailNoteController.update);

// /**
//  * @swagger
//  * /emailNote/{id}:
//  *   delete:
//  *     summary: Exclui uma nota de email pelo ID
//  *     tags: [Notas de Email]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID da Nota de Email
//  *     responses:
//  *       200:
//  *         description: Nota de email excluída com sucesso.
//  *       404:
//  *         description: Nota de email não encontrada.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.delete('/emailNote/:id', authenticate, emailNoteController.delete);

module.exports = router;
