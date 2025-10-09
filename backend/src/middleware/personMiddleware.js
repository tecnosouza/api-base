const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationPerson = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('cpf').notEmpty().withMessage('CPF is required'),		
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Username is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
        validate,
    ];
};

module.exports = {
    createValidationPerson,
};
