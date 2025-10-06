const personService = require('@services/personService');
const { createResponseDTO } = require('@dtos/personDTO');
const { successResponse } = require('../utils/responseUtils');

exports.register = async (req, res, next) => {
    try {
        const person = await personService.register(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new createResponseDTO(person), 201);
    } catch (err) {
        next(err); 
    }
};
