const authService = require('@services/authService');
const { successResponse } = require('../utils/responseUtils');

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const token = await authService.login({ username, password });
        successResponse(res, 'Login realizado com sucesso!', token);
    } catch (err) {
        next(err);
    }
};
