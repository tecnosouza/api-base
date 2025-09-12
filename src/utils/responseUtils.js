const successResponse = (res, message, data, statusCode = 200, pagination = null) => {
    const response = {
        success: true,
        message: message,
        data: data,
    };

    if (pagination) {
        response.pagination = pagination;
    }

    return res.status(statusCode).json(response);
};

const errorResponse = (res, message, errors, statusCode = 400) => {
    return res.status(statusCode).json({
        success: false,
        message: message,
        errors: errors,
    });
};

module.exports = {
    successResponse,
    errorResponse,
};
