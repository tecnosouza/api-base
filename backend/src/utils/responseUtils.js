const successResponse = (res, message, data, pagination = null) => {
    const code = res.statusCode || 200;
	
    const response = {
        success: true,
        message: message,
        data: data,
        code: code
    };

    if (pagination) {
        response.pagination = pagination;
    }

    return res.status(code).json(response);
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
