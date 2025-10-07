const { body } = require('express-validator');
const { validate } = require('@middleware/validationMiddleware');

const createValidationAddress = () => {
    return [
        body('personId').isInt().withMessage('Person ID must be an integer'),
        body('street').notEmpty().withMessage('Street is required'),
        body('number').isInt().withMessage('Number must be an integer'),
        body('neighborhood').notEmpty().withMessage('Neighborhood is required'),
        body('city').notEmpty().withMessage('City is required'),
        body('state').notEmpty().withMessage('State is required'),
        body('zipCode').notEmpty().withMessage('Zip Code is required'),
        validate,
    ];
};

module.exports = {
    createValidationAddress,
};
