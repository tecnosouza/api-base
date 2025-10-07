const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationProduct = () => {
    return [
        body('model').notEmpty().withMessage('Model is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('category_id').isInt().withMessage('Category ID must be an integer'),
        validate,
    ];
};

module.exports = {
    createValidationProduct,
};
