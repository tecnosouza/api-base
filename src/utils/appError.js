// utils/AppError.js
class AppError extends Error {
    /**
   * @param {string|Array} message - String ou array [mensagemParaUsuario, mensagemParaDB]
   * @param {Object} options
   * @param {number} [options.statusCode=500] - Código HTTP
   * @param {string|null} [options.sourceModel=null] - Modelo/fonte do erro
   * @param {Array} [options.errors=[]] - Array de erros detalhados
   * @param {boolean} [options.saveDB=true] - Se deve salvar no DB
   */
    constructor(message, { statusCode = 500, sourceModel = null, errors = [], saveDB = true } = {}) {
        // Se for string, a mensagem é salva em banco e retornada ao usuário
        // Se for array, a posição [0] é retornada ao usuário e a posição [1] enviada ao banco
        super(typeof message === 'string' ? message : message[0]);

        this.messageForUser = Array.isArray(message) ? message[0] : message;
        this.messageForDB = Array.isArray(message) && message[1] ? message[1] : this.messageForUser;

        this.statusCode = statusCode;
        this.source_model = sourceModel;
        this.errors = errors;
        this.saveDB = saveDB;
    }
}

module.exports = AppError;
