const express = require('express');
const router = express.Router();
// const personNoteController = require('@controllers/personNoteController');
// const { createValidationPersonNote } = require('@middleware/personNoteMiddleware');

// /**
//  * @swagger
//  * tags:
//  *   name: Notas de Pessoa
//  *   description: Rotas de notas de pessoa
//  */

// /**
//  * @swagger
//  * /personNote:
//  *   post:
//  *     summary: Registra uma nova nota de pessoa
//  *     tags: [Notas de Pessoa]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/PersonNoteInput'
//  *     responses:
//  *       201:
//  *         description: Nota de pessoa registrada com sucesso.
//  *       400:
//  *         description: Erro de registro
//  */
// router.post('/personNote', createValidationPersonNote(), personNoteController.create);
// /**
//  * @swagger
//  * /personNote:
//  *   get:
//  *     summary: Retorna uma lista de notas de pessoa
//  *     tags: [Notas de Pessoa]
//  *     responses:
//  *       200:
//  *         description: Lista de notas de pessoa retornada com sucesso.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/personNote', personNoteController.getAll);

// /**
//  * @swagger
//  * /personNote/{id}:
//  *   get:
//  *     summary: Retorna uma nota de pessoa pelo ID
//  *     tags: [Notas de Pessoa]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID da nota de pessoa
//  *     responses:
//  *       200:
//  *         description: Nota de pessoa retornada com sucesso.
//  *       404:
//  *         description: Nota de pessoa não encontrada.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/personNote/:id', personNoteController.getById);

// /**
//  * @swagger
//  * /personNote/{id}:
//  *   put:
//  *     summary: Atualiza uma nota de pessoa pelo ID
//  *     tags: [Notas de Pessoa]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID da Nota de Pessoa
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/PersonNoteInput'
//  *     responses:
//  *       200:
//  *         description: Nota de pessoa atualizada com sucesso.
//  *       400:
//  *         description: Erro de validação.
//  *       404:
//  *         description: Nota de pessoa não encontrada.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.put('/personNote/:id', createValidationPersonNote(), personNoteController.update);

// /**
//  * @swagger
//  * /personNote/{id}:
//  *   delete:
//  *     summary: Exclui uma nota de pessoa pelo ID
//  *     tags: [Notas de Pessoa]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID da Nota de Pessoa
//  *     responses:
//  *       200:
//  *         description: Nota de pessoa excluída com sucesso.
//  *       404:
//  *         description: Nota de pessoa não encontrada.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.delete('/personNote/:id', personNoteController.delete);

module.exports = router;
