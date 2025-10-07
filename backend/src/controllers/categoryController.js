const categoryService = require('@services/categoryService');
const { createResponseDTO } = require('@dtos/categoryDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const category = await categoryService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(category), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const categories = await categoryService.getAll(req.query);
        successResponse(res, 'Lista de categorias retornada com sucesso.', categories);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const category = await categoryService.getById(req.params.id);
        if (!category) {
            return successResponse(res, 'Categoria não encontrada.', null, 404);
        }
        successResponse(res, 'Categoria retornada com sucesso.', category);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const category = await categoryService.update(req.params.id, req.body);
        if (!category) {
            return successResponse(res, 'Categoria não encontrada.', null, 404);
        }
        successResponse(res, 'Categoria atualizada com sucesso.', category);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await categoryService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Categoria não encontrada.', null, 404);
        }
        successResponse(res, 'Categoria excluída com sucesso.');
    } catch (err) {
        next(err);
    }
};
