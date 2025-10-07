const personNoteService = require('@services/personNoteService');
const { createResponseDTO } = require('@dtos/personNoteDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const personNote = await personNoteService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(personNote), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const personNotes = await personNoteService.getAll(req.query);
        successResponse(res, 'Lista de notas de pessoa retornada com sucesso.', personNotes);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const personNote = await personNoteService.getById(req.params.id);
        if (!personNote) {
            return successResponse(res, 'Nota de pessoa não encontrada.', null, 404);
        }
        successResponse(res, 'Nota de pessoa retornada com sucesso.', personNote);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const personNote = await personNoteService.update(req.params.id, req.body);
        if (!personNote) {
            return successResponse(res, 'Nota de pessoa não encontrada.', null, 404);
        }
        successResponse(res, 'Nota de pessoa atualizada com sucesso.', personNote);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await personNoteService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Nota de pessoa não encontrada.', null, 404);
        }
        successResponse(res, 'Nota de pessoa excluída com sucesso.');
    } catch (err) {
        next(err);
    }
};
