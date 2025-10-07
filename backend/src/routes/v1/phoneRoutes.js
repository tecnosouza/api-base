const express = require('express');
const router = express.Router();
// const phoneController = require('@controllers/phoneController');
// const { createValidationPhone } = require('@middleware/phoneMiddleware');

// /**
//  * @swagger
//  * tags:
//  *   name: Telefones
//  *   description: Rotas de telefones
//  */

// /**
//  * @swagger
//  * /phone:
//  *   post:
//  *     summary: Registra um novo telefone
//  *     tags: [Telefones]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/PhoneInput'
//  *     responses:
//  *       201:
//  *         description: Telefone registrado com sucesso.
//  *       400:
//  *         description: Erro de registro
//  */
// router.post('/phone', createValidationPhone(), phoneController.create);
// /**
//  * @swagger
//  * /phone:
//  *   get:
//  *     summary: Retorna uma lista de telefones
//  *     tags: [Telefones]
//  *     responses:
//  *       200:
//  *         description: Lista de telefones retornada com sucesso.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/phone', phoneController.getAll);

// /**
//  * @swagger
//  * /phone/{id}:
//  *   get:
//  *     summary: Retorna um telefone pelo ID
//  *     tags: [Telefones]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do telefone
//  *     responses:
//  *       200:
//  *         description: Telefone retornado com sucesso.
//  *       404:
//  *         description: Telefone não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/phone/:id', phoneController.getById);

// /**
//  * @swagger
//  * /phone/{id}:
//  *   put:
//  *     summary: Atualiza um telefone pelo ID
//  *     tags: [Telefones]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do Telefone
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/PhoneInput'
//  *     responses:
//  *       200:
//  *         description: Telefone atualizado com sucesso.
//  *       400:
//  *         description: Erro de validação.
//  *       404:
//  *         description: Telefone não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.put('/phone/:id', createValidationPhone(), phoneController.update);

// /**
//  * @swagger
//  * /phone/{id}:
//  *   delete:
//  *     summary: Exclui um telefone pelo ID
//  *     tags: [Telefones]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do Telefone
//  *     responses:
//  *       200:
//  *         description: Telefone excluído com sucesso.
//  *       404:
//  *         description: Telefone não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.delete('/phone/:id', phoneController.delete);

module.exports = router;
