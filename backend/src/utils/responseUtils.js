const successResponse = (res, message, data) => {
    const response = {
        success: true,
        message: message,
        data: data.data,
        code: res.code ?? 200
    };

    if (data.pagination) {
        response.pagination = data.pagination;
    }

    return res.status(res.code ?? 200).json(response);
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
