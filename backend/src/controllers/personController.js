const personService = require('@services/personService');
const { createResponseDTO } = require('@dtos/personDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const person = await personService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(person), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const persons = await personService.getAll();
        successResponse(res, 'Lista de pessoas retornada com sucesso.', persons);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const person = await personService.getById(req.params.id);
        if (!person) {
            return successResponse(res, 'Pessoa não encontrada.', null, 404);
        }
        successResponse(res, 'Pessoa retornada com sucesso.', person);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const person = await personService.update(req.params.id, req.body);
        if (!person) {
            return successResponse(res, 'Pessoa não encontrada.', null, 404);
        }
        successResponse(res, 'Pessoa atualizada com sucesso.', person);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await personService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Pessoa não encontrada.', null, 404);
        }
        successResponse(res, 'Pessoa excluída com sucesso.');
    } catch (err) {
        next(err);
    }
};
