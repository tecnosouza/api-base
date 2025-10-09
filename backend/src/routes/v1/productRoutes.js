const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authenticate } = require('@middleware/authMiddleware');
const productController = require('@controllers/productController');
const { createValidationProduct } = require('@middleware/productMiddleware');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/tmp');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Rotas de produtos
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Registra um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       $ref: '#/components/requestBodies/ProductRequestBody'
 *     responses:
 *       201:
 *         description: Produto registrado com sucesso.
 *       400:
 *         description: Erro de registro
 */
router.post('/product', authenticate, upload.single('image'), createValidationProduct(), productController.create);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Retorna uma lista de produtos
 *     tags: [Produtos]
 *     parameters:
 *       - $ref: '#/components/parameters/PaginationParameters'
 *       - $ref: '#/components/parameters/LimitParameters'
 *       - $ref: '#/components/parameters/OrderByParameters'
 *       - $ref: '#/components/parameters/FiltersParameters'
 *       - $ref: '#/components/parameters/ColumnsParameters'
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/product', authenticate, productController.getAll);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto retornado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.get('/product/:id', authenticate, productController.getById);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Produto
 *     requestBody:
 *       required: true
 *       $ref: '#/components/requestBodies/ProductRequestBody'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       400:
 *         description: Erro de validação.
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.put('/product/:id', authenticate, upload.single('image'), productController.update);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Exclui um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Produto
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso.
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro do servidor.
 */
router.delete('/product/:id', authenticate, productController.delete);

/**
 * Rota publica para o site popular
 */
router.get('/product-site/:idCategoria', productController.getSite);

module.exports = router;
