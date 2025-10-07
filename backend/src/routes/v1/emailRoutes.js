const express = require('express');
const router = express.Router();
// const emailController = require('@controllers/emailController');
// const { createValidationEmail } = require('@middleware/emailMiddleware');

// /**
//  * @swagger
//  * tags:
//  *   name: Emails
//  *   description: Rotas de emails
//  */

// /**
//  * @swagger
//  * /email:
//  *   post:
//  *     summary: Registra um novo email
//  *     tags: [Emails]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/EmailInput'
//  *     responses:
//  *       201:
//  *         description: Email registrado com sucesso.
//  *       400:
//  *         description: Erro de registro
//  */
// router.post('/email', createValidationEmail(), emailController.create);
// /**
//  * @swagger
//  * /email:
//  *   get:
//  *     summary: Retorna uma lista de emails
//  *     tags: [Emails]
//  *     responses:
//  *       200:
//  *         description: Lista de emails retornada com sucesso.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/email', emailController.getAll);

// /**
//  * @swagger
//  * /email/{id}:
//  *   get:
//  *     summary: Retorna um email pelo ID
//  *     tags: [Emails]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do email
//  *     responses:
//  *       200:
//  *         description: Email retornado com sucesso.
//  *       404:
//  *         description: Email não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/email/:id', emailController.getById);

// /**
//  * @swagger
//  * /email/{id}:
//  *   put:
//  *     summary: Atualiza um email pelo ID
//  *     tags: [Emails]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do Email
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/EmailInput'
//  *     responses:
//  *       200:
//  *         description: Email atualizado com sucesso.
//  *       400:
//  *         description: Erro de validação.
//  *       404:
//  *         description: Email não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.put('/email/:id', createValidationEmail(), emailController.update);

// /**
//  * @swagger
//  * /email/{id}:
//  *   delete:
//  *     summary: Exclui um email pelo ID
//  *     tags: [Emails]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do Email
//  *     responses:
//  *       200:
//  *         description: Email excluído com sucesso.
//  *       404:
//  *         description: Email não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.delete('/email/:id', emailController.delete);

module.exports = router;
