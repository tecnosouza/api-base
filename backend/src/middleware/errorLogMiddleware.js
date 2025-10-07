const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationErrorLog = () => {
    return [
        body('statusCode').isInt().withMessage('Status Code must be an integer'),
        body('message').notEmpty().withMessage('Message is required'),
        body('stack').notEmpty().withMessage('Stack is required'),
        body('source').notEmpty().withMessage('Source is required'),
        body('userId').isInt().withMessage('User ID must be an integer'),
        validate,
    ];
};

module.exports = {
    createValidationErrorLog,
};
