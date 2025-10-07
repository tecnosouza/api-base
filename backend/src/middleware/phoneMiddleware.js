const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationPhone = () => {
    return [
        body('personId').isInt().withMessage('Person ID is required and must be an integer'),
        body('phoneNumber').notEmpty().withMessage('Phone number is required'),
        body('isMain').isBoolean().withMessage('Is Main must be a boolean'),
        validate,
    ];
};

module.exports = {
    createValidationPhone,
};
