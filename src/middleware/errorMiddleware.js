// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log do erro para depuração

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor';
    const errors = err.errors || []; // Adiciona um array de erros, se existir

    res.status(statusCode).json({
        success: false,
        message: message,
        errors: errors, // Inclui o array de erros
        // Incluir stack trace apenas em ambiente de desenvolvimento
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
