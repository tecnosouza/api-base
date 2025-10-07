class CreateErrorLogDTO {
    constructor({ person_id, level, message, stack_trace, source_model, request_url, request_method, request_headers, request_body, user_id, status_code }) {
        this.person_id = person_id;
        this.level = level;
        this.message = message;
        this.stack_trace = stack_trace;
        this.source_model = source_model;
        this.request_url = request_url;
        this.request_method = request_method;
        this.request_headers = request_headers;
        this.request_body = request_body;
        this.user_id = user_id;
        this.status_code = status_code;
    }
}

class UpdateErrorLogDTO {
    constructor({ person_id, level, message, stack_trace, source_model, request_url, request_method, request_headers, request_body, user_id, status_code }) {
        this.person_id = person_id;
        this.level = level;
        this.message = message;
        this.stack_trace = stack_trace;
        this.source_model = source_model;
        this.request_url = request_url;
        this.request_method = request_method;
        this.request_headers = request_headers;
        this.request_body = request_body;
        this.user_id = user_id;
        this.status_code = status_code;
    }
}

class ErrorLogResponseDTO {
    constructor(errorLog) {
        this.id = errorLog.id;
        this.person_id = errorLog.person_id;
        this.level = errorLog.level;
        this.message = errorLog.message;
        this.stack_trace = errorLog.stack_trace;
        this.source_model = errorLog.source_model;
        this.request_url = errorLog.request_url;
        this.request_method = errorLog.request_method;
        this.request_headers = errorLog.request_headers;
        this.request_body = errorLog.request_body;
        this.user_id = errorLog.user_id;
        this.status_code = errorLog.status_code;
        this.created_at = errorLog.created_at;
        this.updated_at = errorLog.updated_at;
    }
}

module.exports = {
    CreateErrorLogDTO,
    UpdateErrorLogDTO,
    ErrorLogResponseDTO
};
