const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationCategory = () => {
    return [
        body('title_menu').notEmpty().withMessage('title_menu is required'),
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('is_active').notEmpty().withMessage('is_active is required'),
        validate,
    ];
};

module.exports = {
    createValidationCategory,
};
