const productService = require('@services/productService');
const { createResponseDTO } = require('@dtos/productDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const product = await productService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(product), 201);
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const products = await productService.getAll(req.query);
        successResponse(res, 'Lista de produtos retornada com sucesso.', products);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const product = await productService.getById(req.params.id);
        if (!product) {
            return successResponse(res, 'Produto não encontrado.', null, 404);
        }
        successResponse(res, 'Produto retornado com sucesso.', product);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const product = await productService.update(req.params.id, req.body);
        if (!product) {
            return successResponse(res, 'Produto não encontrado.', null, 404);
        }
        successResponse(res, 'Produto atualizado com sucesso.', product);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await productService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Produto não encontrado.', null, 404);
        }
        successResponse(res, 'Produto excluído com sucesso.');
    } catch (err) {
        next(err);
    }
};
