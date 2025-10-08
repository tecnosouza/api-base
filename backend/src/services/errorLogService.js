const DataBaseService = require('../database/services/DataBaseService');
const AppError = require('@utils/appError');
const { ErrorLog, sequelize } = require('@models/index.js');
const { CreateErrorLogDTO, UpdateErrorLogDTO, ErrorLogResponseDTO } = require('@dtos/errorLogDTO');
const { PaginationDTO } = require('@dtos/paginationDTO');
const attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] };

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

exports.getAll = async (query) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(ErrorLog, query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const errorLogs = await ErrorLog.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : attributes,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });
    
    return { data: errorLogs.map(errorLog => new ErrorLogResponseDTO(errorLog)), pagination: new PaginationDTO(pagination) };
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
        await errorLog.destroy({ transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
