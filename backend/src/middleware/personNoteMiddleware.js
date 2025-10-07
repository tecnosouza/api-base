const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationPersonNote = () => {
    return [
        body('personId').isInt().withMessage('Person ID must be an integer'),
        body('note').notEmpty().withMessage('Note is required'),
        validate,
    ];
};

module.exports = {
    createValidationPersonNote,
};
