const authService = require('@services/authService');
const { AuthRegisterResponseDTO, AuthLoginResponseDTO } = require('@dtos/authDTO');
const { successResponse } = require('../utils/responseUtils');

exports.register = async (req, res, next) => {
    try {
        const person = await authService.register(req.body);
        successResponse(res, 'Registro realizado com sucesso.', new AuthRegisterResponseDTO(person), 201);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const token = await authService.login({ username, password });
        successResponse(res, 'Login realizado com sucesso!', { data: new AuthLoginResponseDTO(token.token, token.personData) });
    } catch (err) {
        next(err);
    }
};
