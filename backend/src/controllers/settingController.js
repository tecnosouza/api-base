const settingService = require('@services/settingService');
const { createResponseDTO } = require('@dtos/settingDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const setting = await settingService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(setting), 201);
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const settings = await settingService.getAll();
        successResponse(res, 'Lista de configurações retornada com sucesso.', settings);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const setting = await settingService.getById(req.params.id);
        if (!setting) {
            return successResponse(res, 'Configuração não encontrada.', null, 404);
        }
        successResponse(res, 'Configuração retornada com sucesso.', setting);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const setting = await settingService.update(req.params.id, req.body);
        if (!setting) {
            return successResponse(res, 'Configuração não encontrada.', null, 404);
        }
        successResponse(res, 'Configuração atualizada com sucesso.', setting);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await settingService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Configuração não encontrada.', null, 404);
        }
        successResponse(res, 'Configuração excluída com sucesso.');
    } catch (err) {
        next(err);
    }
};
