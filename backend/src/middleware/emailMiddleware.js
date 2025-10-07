const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationEmail = () => {
    return [
        body('personId').isInt().withMessage('Person ID must be an integer'),
        body('email').isEmail().withMessage('Email must be a valid email address'),
        body('isMain').isBoolean().withMessage('Is Main must be a boolean'),
        validate,
    ];
};

module.exports = {
    createValidationEmail,
};
