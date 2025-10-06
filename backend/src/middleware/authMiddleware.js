const jwt = require('jsonwebtoken');
const { errorResponse } = require('@utils/responseUtils');
const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');
const { CompanyToken } = require('@models/index.js');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const tokenApiKey = req.header('x-api-key');

    if (!token && !tokenApiKey) {
        return errorResponse(res, 'No token, authorization denied', null, 401);
    }

    try {
    // Primeiro tenta validar pela API Key (CompanyToken)
        if (tokenApiKey) {
            const tokenExists = await CompanyToken.findOne({ where: { token: tokenApiKey } });
            if (tokenExists) {
                req.user = {
                    role: 'company',
                    tokenId: tokenExists.id,
                    tokenValue: tokenApiKey,
                };
                return next();
            }
        }

        // Se não encontrou via API Key, tenta validar via JWT
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            return next();
        }

        return errorResponse(res, 'Token is not valid', null, 401);
    } catch (error) {
        console.error('Auth error:', error);
        return errorResponse(res, 'Token is not valid', null, 401);
    }
};

const loginValidationRules = () => {
    return [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required'),
        validate,
    ];
};

module.exports = {
    authenticate,
    loginValidationRules,
};
