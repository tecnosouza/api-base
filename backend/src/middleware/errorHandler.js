/* eslint-disable no-unused-vars */
const loadEnv = require('../config/env');
loadEnv();

const EmailService = require('../services/EmailService');
const { errorResponse } = require('../utils/responseUtils');
const logError = require('../utils/ErrorLogs');
const AppError = require('@utils/appError');

async function errorHandler(err, req, res, next) {
    const isAppError = err instanceof AppError;

    const statusCode = isAppError ? err.statusCode : 500;
    const messageForUser = isAppError ? err.messageForUser : 'Erro interno do servidor';
    const messageForDB = isAppError ? err.messageForDB : err.message || 'Erro desconhecido';

    try {
        if (!isAppError || err.saveDB !== false) {
            await logError({
                message: messageForDB,
                stack: err.stack,
                req,
                statusCode,
                userId: req?.user?.id || null,
                sourceModel: isAppError ? err.source_model : 'Unknown',
                level: statusCode >= 500 ? 'FATAL' : 'ERROR',
            });

            console.error('❌=====================================================================================❌');
            console.error('ERRO: ', statusCode >= 500 ? 'FATAL' : 'ERROR');
            console.error('statusCode: ', statusCode);
            console.error('Mensagem: ', messageForDB);
            console.error('trace: ', err.stack);
            console.error('❌=====================================================================================❌');
        }
    } catch (dbErr) {
        console.error('❌ Falha ao salvar log no banco:', dbErr);
    }

    try {
        if (err.saveDB && process.env.SEND_ERROR_EMAIL === 'true' && process.env.SEND_ERROR_EMAIL_TO) {
            const recipients = process.env.SEND_ERROR_EMAIL_TO.split(',');
            const errorSubject = `Erro na Aplicação: ${messageForUser}`;
            const errorHtml = `
                <h1>Erro na Aplicação: ${process.env.API_NAME}</h1>
                <p><strong>Mensagem:</strong> ${messageForDB}</p>
                <p><strong>Status Code:</strong> ${statusCode}</p>
                <p><strong>URL:</strong> ${req.originalUrl}</p>
                <p><strong>Método:</strong> ${req.method}</p>
                <h2>Stack Trace:</h2>
                <pre>${err.stack}</pre>
            `;

            for (const recipient of recipients) {
                await EmailService.sendEmail(recipient.trim(), errorSubject, errorHtml);
            }
        }
    } catch (dbErr) {
        console.error('❌ Falha ao enviar e-mail:', dbErr);
    }

    return errorResponse(res, messageForUser, err.errors || [], statusCode);
}

module.exports = errorHandler;
