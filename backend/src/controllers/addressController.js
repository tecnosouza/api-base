const addressService = require('@services/addressService');
const { createResponseDTO } = require('@dtos/addressDTO');
const { successResponse } = require('../utils/responseUtils');

exports.create = async (req, res, next) => {
    try {
        const address = await addressService.create(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(address), 201);
    } catch (err) {
        next(err); 
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const addresses = await addressService.getAll(req.query);
        successResponse(res, 'Lista de endereços retornada com sucesso.', addresses.data, addresses.pagination);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const address = await addressService.getById(req.params.id);
        if (!address) {
            return successResponse(res, 'Endereço não encontrado.', null, 404);
        }
        successResponse(res, 'Endereço retornado com sucesso.', address);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const address = await addressService.update(req.params.id, req.body);
        if (!address) {
            return successResponse(res, 'Endereço não encontrado.', null, 404);
        }
        successResponse(res, 'Endereço atualizado com sucesso.', address);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await addressService.delete(req.params.id);
        if (!deleted) {
            return successResponse(res, 'Endereço não encontrado.', null, 404);
        }
        successResponse(res, 'Endereço excluído com sucesso.');
    } catch (err) {
        next(err);
    }
};
