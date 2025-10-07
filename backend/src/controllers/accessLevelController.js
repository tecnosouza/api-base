const accessLevelService = require('@services/accessLevelService');
const { createResponseDTO } = require('@dtos/accessLevelDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const accessLevel = await accessLevelService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(accessLevel), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const accessLevels = await accessLevelService.getAll();
        successResponse(res, 'Lista de níveis de acesso retornada com sucesso.', accessLevels);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const accessLevel = await accessLevelService.getById(req.params.id);
        if (!accessLevel) {
            return successResponse(res, 'Nível de acesso não encontrado.', null, 404);
        }
        successResponse(res, 'Nível de acesso retornado com sucesso.', accessLevel);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const accessLevel = await accessLevelService.update(req.params.id, req.body);
        if (!accessLevel) {
            return successResponse(res, 'Nível de acesso não encontrado.', null, 404);
        }
        successResponse(res, 'Nível de acesso atualizado com sucesso.', accessLevel);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await accessLevelService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Nível de acesso não encontrado.', null, 404);
        }
        successResponse(res, 'Nível de acesso excluído com sucesso.');
    } catch (err) {
        next(err);
    }
};
