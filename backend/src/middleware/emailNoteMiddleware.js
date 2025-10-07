const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationEmailNote = () => {
    return [
        body('emailId').isInt().withMessage('Email ID must be an integer'),
        body('note').notEmpty().withMessage('Note is required'),
        validate,
    ];
};

module.exports = {
    createValidationEmailNote,
};
