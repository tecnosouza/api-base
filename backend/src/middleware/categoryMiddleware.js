const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationCategory = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('description').notEmpty().withMessage('Description is required'),
        validate,
    ];
};

module.exports = {
    createValidationCategory,
};
