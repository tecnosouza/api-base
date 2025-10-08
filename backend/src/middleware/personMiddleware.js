const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationPerson = () => {
    return [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
        body('name').notEmpty().withMessage('Name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('date_of_birth').isISO8601().toDate().withMessage('Date of birth must be a valid date'),
        body('rg').notEmpty().withMessage('RG is required'),
        body('cpf').notEmpty().withMessage('CPF is required'),
        validate,
    ];
};

module.exports = {
    createValidationPerson,
};
