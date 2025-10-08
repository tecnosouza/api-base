const emailNoteService = require('@services/emailNoteService');
const { createResponseDTO } = require('@dtos/emailNoteDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const emailNote = await emailNoteService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(emailNote), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const emailNotes = await emailNoteService.getAll(req.query);
        successResponse(res, 'Lista de notas de email retornada com sucesso.', emailNotes.data, emailNotes.pagination);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const emailNote = await emailNoteService.getById(req.params.id);
        if (!emailNote) {
            return successResponse(res, 'Nota de email não encontrada.', null, 404);
        }
        successResponse(res, 'Nota de email retornada com sucesso.', emailNote);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const emailNote = await emailNoteService.update(req.params.id, req.body);
        if (!emailNote) {
            return successResponse(res, 'Nota de email não encontrada.', null, 404);
        }
        successResponse(res, 'Nota de email atualizada com sucesso.', emailNote);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await emailNoteService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Nota de email não encontrada.', null, 404);
        }
        successResponse(res, 'Nota de email excluída com sucesso.');
    } catch (err) {
        next(err);
    }
};
