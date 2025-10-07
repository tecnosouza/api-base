class CreateErrorLogDTO {
    constructor({ statusCode, message, stack, source, userId }) {
        this.statusCode = statusCode;
        this.message = message;
        this.stack = stack;
        this.source = source;
        this.userId = userId;
    }
}

class UpdateErrorLogDTO {
    constructor({ statusCode, message, stack, source, userId }) {
        this.statusCode = statusCode;
        this.message = message;
        this.stack = stack;
        this.source = source;
        this.userId = userId;
    }
}

class ErrorLogResponseDTO {
    constructor(errorLog) {
        this.id = errorLog.id;
        this.statusCode = errorLog.statusCode;
        this.message = errorLog.message;
        this.stack = errorLog.stack;
        this.source = errorLog.source;
        this.userId = errorLog.userId;
        this.createdAt = errorLog.createdAt;
        this.updatedAt = errorLog.updatedAt;
        this.deletedAt = errorLog.deletedAt;
    }
}

module.exports = {
    CreateErrorLogDTO,
    UpdateErrorLogDTO,
    ErrorLogResponseDTO
};
