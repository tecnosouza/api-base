const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationSetting = () => {
    return [
        body('person_id').isInt().withMessage('Person ID must be an integer'),
        body('scale').isInt().withMessage('Scale must be an integer'),
        body('style_menu').isInt().withMessage('Style menu must be an integer'),
        body('theme').isInt().withMessage('Theme must be an integer'),
        validate,
    ];
};

module.exports = {
    createValidationSetting,
};
