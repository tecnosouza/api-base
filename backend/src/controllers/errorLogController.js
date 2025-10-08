const errorLogService = require('@services/errorLogService');
const { createResponseDTO } = require('@dtos/errorLogDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const errorLog = await errorLogService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(errorLog), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const errorLogs = await errorLogService.getAll(req.query);
        successResponse(res, 'Lista de logs de erro retornada com sucesso.', errorLogs.data, errorLogs.pagination);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const errorLog = await errorLogService.getById(req.params.id);
        if (!errorLog) {
            return successResponse(res, 'Log de erro não encontrado.', null, 404);
        }
        successResponse(res, 'Log de erro retornado com sucesso.', errorLog);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const errorLog = await errorLogService.update(req.params.id, req.body);
        if (!errorLog) {
            return successResponse(res, 'Log de erro não encontrado.', null, 404);
        }
        successResponse(res, 'Log de erro atualizado com sucesso.', errorLog);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await errorLogService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Log de erro não encontrado.', null, 404);
        }
        successResponse(res, 'Log de erro excluído com sucesso.');
    } catch (err) {
        next(err);
    }
};
