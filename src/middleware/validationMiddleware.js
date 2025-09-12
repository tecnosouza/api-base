const { validationResult } = require('express-validator');
const { errorResponse } = require('@utils/responseUtils');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return errorResponse(res, 'Erro de validação', extractedErrors, 422);
};

module.exports = {
    validate
};
