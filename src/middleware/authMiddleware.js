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

const registerValidationRules = () => {
    return [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
        body('name').notEmpty().withMessage('Name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('dateOfBirth').isISO8601().toDate().withMessage('Date of birth must be a valid date'),
        body('rg').notEmpty().withMessage('RG is required'),
        body('cpf').notEmpty().withMessage('CPF is required'),
        body('street').notEmpty().withMessage('Street is required'),
        body('number').isInt().withMessage('Number must be an integer'),
        body('neighborhood').notEmpty().withMessage('Neighborhood is required'),
        body('city').notEmpty().withMessage('City is required'),
        body('state').notEmpty().withMessage('State is required'),
        validate,
    ];
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
    registerValidationRules,
    loginValidationRules,
};
