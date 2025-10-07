const phoneNoteService = require('@services/phoneNoteService');
const { createResponseDTO } = require('@dtos/phoneNoteDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const phoneNote = await phoneNoteService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(phoneNote), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const phoneNotes = await phoneNoteService.getAll();
        successResponse(res, 'Lista de notas de telefone retornada com sucesso.', phoneNotes);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const phoneNote = await phoneNoteService.getById(req.params.id);
        if (!phoneNote) {
            return successResponse(res, 'Nota de telefone não encontrada.', null, 404);
        }
        successResponse(res, 'Nota de telefone retornada com sucesso.', phoneNote);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const phoneNote = await phoneNoteService.update(req.params.id, req.body);
        if (!phoneNote) {
            return successResponse(res, 'Nota de telefone não encontrada.', null, 404);
        }
        successResponse(res, 'Nota de telefone atualizada com sucesso.', phoneNote);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await phoneNoteService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Nota de telefone não encontrada.', null, 404);
        }
        successResponse(res, 'Nota de telefone excluída com sucesso.');
    } catch (err) {
        next(err);
    }
};
