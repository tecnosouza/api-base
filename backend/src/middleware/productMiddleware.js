const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationProduct = () => {
    return [
        body('model').notEmpty().withMessage('Model is required'),
        body('category_id').isInt().withMessage('Category ID must be an integer'),
        body('storage_id').isInt().withMessage('Storage ID must be an integer'),
        body('color_id').isInt().withMessage('Color ID must be an integer'),
        body('memory_id').isInt().withMessage('Memory ID must be an integer'),
        body('size_id').isInt().withMessage('Size ID must be an integer'),
        body('chip').isInt().withMessage('Chip must be an integer'),
        body('is_active').isBoolean().withMessage('Is active must be a boolean'),
        validate,
    ];
};

module.exports = {
    createValidationProduct,
};
