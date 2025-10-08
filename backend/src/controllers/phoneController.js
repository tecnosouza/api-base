const phoneService = require('@services/phoneService');
const { createResponseDTO } = require('@dtos/phoneDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const phone = await phoneService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(phone), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const phones = await phoneService.getAll(req.query);
        successResponse(res, 'Lista de telefones retornada com sucesso.', phones.data, phones.pagination);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const phone = await phoneService.getById(req.params.id);
        if (!phone) {
            return successResponse(res, 'Telefone não encontrado.', null, 404);
        }
        successResponse(res, 'Telefone retornado com sucesso.', phone);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const phone = await phoneService.update(req.params.id, req.body);
        if (!phone) {
            return successResponse(res, 'Telefone não encontrado.', null, 404);
        }
        successResponse(res, 'Telefone atualizado com sucesso.', phone);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await phoneService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Telefone não encontrado.', null, 404);
        }
        successResponse(res, 'Telefone excluído com sucesso.');
    } catch (err) {
        next(err);
    }
};
