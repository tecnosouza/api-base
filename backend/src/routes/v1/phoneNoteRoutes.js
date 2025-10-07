const express = require('express');
const router = express.Router();
// const phoneNoteController = require('@controllers/phoneNoteController');
// const { createValidationPhoneNote } = require('@middleware/phoneNoteMiddleware');

// /**
//  * @swagger
//  * tags:
//  *   name: Notas de Telefone
//  *   description: Rotas de notas de telefone
//  */

// /**
//  * @swagger
//  * /phoneNote:
//  *   post:
//  *     summary: Registra uma nova nota de telefone
//  *     tags: [Notas de Telefone]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/PhoneNoteInput'
//  *     responses:
//  *       201:
//  *         description: Nota de telefone registrada com sucesso.
//  *       400:
//  *         description: Erro de registro
//  */
// router.post('/phoneNote', createValidationPhoneNote(), phoneNoteController.create);
// /**
//  * @swagger
//  * /phoneNote:
//  *   get:
//  *     summary: Retorna uma lista de notas de telefone
//  *     tags: [Notas de Telefone]
//  *     parameters:
//  *       - $ref: '#/components/parameters/PaginationParameters'
//  *       - $ref: '#/components/parameters/LimitParameters'
//  *       - $ref: '#/components/parameters/OrderByParameters'
//  *       - $ref: '#/components/parameters/FiltersParameters'
//  *       - $ref: '#/components/parameters/ColumnsParameters'
//  *     responses:
//  *       200:
//  *         description: Lista de notas de telefone retornada com sucesso.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/phoneNote', phoneNoteController.getAll);

// /**
//  * @swagger
//  * /phoneNote/{id}:
//  *   get:
//  *     summary: Retorna uma nota de telefone pelo ID
//  *     tags: [Notas de Telefone]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID da nota de telefone
//  *     responses:
//  *       200:
//  *         description: Nota de telefone retornada com sucesso.
//  *       404:
//  *         description: Nota de telefone não encontrada.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/phoneNote/:id', phoneNoteController.getById);

// /**
//  * @swagger
//  * /phoneNote/{id}:
//  *   put:
//  *     summary: Atualiza uma nota de telefone pelo ID
//  *     tags: [Notas de Telefone]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID da Nota de Telefone
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/PhoneNoteInput'
//  *     responses:
//  *       200:
//  *         description: Nota de telefone atualizada com sucesso.
//  *       400:
//  *         description: Erro de validação.
//  *       404:
//  *         description: Nota de telefone não encontrada.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.put('/phoneNote/:id', createValidationPhoneNote(), phoneNoteController.update);

// /**
//  * @swagger
//  * /phoneNote/{id}:
//  *   delete:
//  *     summary: Exclui uma nota de telefone pelo ID
//  *     tags: [Notas de Telefone]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID da Nota de Telefone
//  *     responses:
//  *       200:
//  *         description: Nota de telefone excluída com sucesso.
//  *       404:
//  *         description: Nota de telefone não encontrada.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.delete('/phoneNote/:id', phoneNoteController.delete);

module.exports = router;
