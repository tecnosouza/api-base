const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationAccess = () => {
    return [
        body('personId').isInt().withMessage('Person ID must be an integer'),
        body('accessLevelId').isInt().withMessage('Access Level ID must be an integer'),
        body('username').notEmpty().withMessage('Username is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
        body('active').isBoolean().withMessage('Active must be a boolean'),
        validate,
    ];
};

module.exports = {
    createValidationAccess,
};
