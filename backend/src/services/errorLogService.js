const { ErrorLog, sequelize } = require('@models/index.js');
const AppError = require('@utils/appError');
const { CreateErrorLogDTO, UpdateErrorLogDTO, ErrorLogResponseDTO } = require('@dtos/errorLogDTO');

exports.create = async (errorLogData) => {
    const createDTO = new CreateErrorLogDTO(errorLogData);
    const transaction = await sequelize.transaction();
    try {
        const errorLog = await ErrorLog.create(createDTO, { transaction });
        await transaction.commit();
        return new ErrorLogResponseDTO(errorLog);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async () => {
    const errorLogs = await ErrorLog.findAll();
    return errorLogs.map(errorLog => new ErrorLogResponseDTO(errorLog));
};

exports.getById = async (id) => {
    const errorLog = await ErrorLog.findByPk(id);
    if (!errorLog) {
        throw new AppError('Log de erro não encontrado.', { statusCode: 404, sourceModel: 'ErrorLog', saveDB: false });
    }
    return new ErrorLogResponseDTO(errorLog);
};

exports.update = async (id, errorLogData) => {
    const updateDTO = new UpdateErrorLogDTO(errorLogData);
    const transaction = await sequelize.transaction();
    try {
        let errorLog = await ErrorLog.findByPk(id, { transaction });
        if (!errorLog) {
            await transaction.rollback();
            return null;
        }
        await errorLog.update(updateDTO, { transaction });
        await transaction.commit();
        return new ErrorLogResponseDTO(errorLog);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const errorLog = await ErrorLog.findByPk(id, { transaction });
        if (!errorLog) {
            await transaction.rollback();
            return false;
        }
        await errorLog.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
