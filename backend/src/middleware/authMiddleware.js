const jwt = require('jsonwebtoken');
const { errorResponse } = require('@utils/responseUtils');
const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const tokenApiKey = req.header('x-api-key');

        if (!token && !tokenApiKey) {
            return errorResponse(res, 'No token, authorization denied', null, 401);
        }

        if (token) {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
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
