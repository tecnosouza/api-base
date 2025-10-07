const successResponse = (res, message, data) => {
    const code = res.statusCode || 200;
	
    const response = {
        success: true,
        message: message,
        data: data.data,
        code: code
    };

    if (data.pagination) {
        response.pagination = data.pagination;
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
