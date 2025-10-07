const emailService = require('@services/emailService');
const { createResponseDTO } = require('@dtos/emailDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const email = await emailService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(email), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const emails = await emailService.getAll();
        successResponse(res, 'Lista de emails retornada com sucesso.', emails);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const email = await emailService.getById(req.params.id);
        if (!email) {
            return successResponse(res, 'Email não encontrado.', null, 404);
        }
        successResponse(res, 'Email retornado com sucesso.', email);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const email = await emailService.update(req.params.id, req.body);
        if (!email) {
            return successResponse(res, 'Email não encontrado.', null, 404);
        }
        successResponse(res, 'Email atualizado com sucesso.', email);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await emailService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Email não encontrado.', null, 404);
        }
        successResponse(res, 'Email excluído com sucesso.');
    } catch (err) {
        next(err);
    }
};
