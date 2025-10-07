const { ErrorLog } = require('../models');

async function errorLogs({
    message,
    stack,
    req = null,
    statusCode = 500,
    level = 'ERROR',
    userId = null,
    sourceModel = null,
}) {
    try {
        await ErrorLog.create({
            message,
            person_id: userId || null,
            stack_trace: stack,
            source_model: sourceModel,
            request_url: req?.originalUrl || null,
            request_method: req?.method || null,
            request_headers: req?.headers || null,
            request_body: req?.body || null,
            status_code: statusCode,
            level,
        });
    } catch (dbErr) {
        console.error('❌ Falha ao salvar log no banco:', dbErr);
    }
}

module.exports = errorLogs;
