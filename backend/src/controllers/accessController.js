const accessService = require('@services/accessService');
const { AccessResponseDTO } = require('@dtos/accessDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const access = await accessService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new AccessResponseDTO(access), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const accesses = await accessService.getAll(req.query);
        successResponse(res, 'Lista de acessos retornada com sucesso.', accesses.data, accesses.pagination);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const access = await accessService.getById(req.params.id);
        if (!access) {
            return successResponse(res, 'Acesso não encontrado.', null, 404);
        }
        successResponse(res, 'Acesso retornado com sucesso.', access);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const access = await accessService.update(req.params.id, req.body);
        if (!access) {
            return successResponse(res, 'Acesso não encontrado.', null, 404);
        }
        successResponse(res, 'Acesso atualizado com sucesso.', access);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await accessService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Acesso não encontrado.', null, 404);
        }
        successResponse(res, 'Acesso excluído com sucesso.');
    } catch (err) {
        next(err);
    }
};
