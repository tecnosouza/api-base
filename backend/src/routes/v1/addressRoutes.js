const express = require('express');
const router = express.Router();
// const addressController = require('@controllers/addressController');
// const { createValidationAddress } = require('@middleware/addressMiddleware');

// /**
//  * @swagger
//  * tags:
//  *   name: Endereços
//  *   description: Rotas de endereços
//  */

// /**
//  * @swagger
//  * /address:
//  *   post:
//  *     summary: Registra um novo endereço
//  *     tags: [Endereços]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/AddressInput'
//  *     responses:
//  *       201:
//  *         description: Endereço registrado com sucesso.
//  *       400:
//  *         description: Erro de registro
//  */
// router.post('/address', createValidationAddress(), addressController.create);
// /**
//  * @swagger
//  * /address:
//  *   get:
//  *     summary: Retorna uma lista de endereços
//  *     tags: [Endereços]
//  *     parameters:
//  *       - $ref: '#/components/parameters/PaginationParameters'
//  *       - $ref: '#/components/parameters/LimitParameters'
//  *       - $ref: '#/components/parameters/OrderByParameters'
//  *       - $ref: '#/components/parameters/FiltersParameters'
//  *       - $ref: '#/components/parameters/ColumnsParameters'
//  *     responses:
//  *       200:
//  *         description: Lista de endereços retornada com sucesso.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/address', addressController.getAll);

// /**
//  * @swagger
//  * /address/{id}:
//  *   get:
//  *     summary: Retorna um endereço pelo ID
//  *     tags: [Endereços]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do endereço
//  *     responses:
//  *       200:
//  *         description: Endereço retornado com sucesso.
//  *       404:
//  *         description: Endereço não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.get('/address/:id', addressController.getById);

// /**
//  * @swagger
//  * /address/{id}:
//  *   put:
//  *     summary: Atualiza um endereço pelo ID
//  *     tags: [Endereços]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do Endereço
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/AddressInput'
//  *     responses:
//  *       200:
//  *         description: Endereço atualizado com sucesso.
//  *       400:
//  *         description: Erro de validação.
//  *       404:
//  *         description: Endereço não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.put('/address/:id', createValidationAddress(), addressController.update);

// /**
//  * @swagger
//  * /address/{id}:
//  *   delete:
//  *     summary: Exclui um endereço pelo ID
//  *     tags: [Endereços]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do Endereço
//  *     responses:
//  *       200:
//  *         description: Endereço excluído com sucesso.
//  *       404:
//  *         description: Endereço não encontrado.
//  *       500:
//  *         description: Erro do servidor.
//  */
// router.delete('/address/:id', addressController.delete);

module.exports = router;
