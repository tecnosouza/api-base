const DataBaseService = require('../database/services/DataBaseService');
const AppError = require('@utils/appError');
const { Email, sequelize } = require('@models/index.js');
const { CreateEmailDTO, UpdateEmailDTO, EmailResponseDTO } = require('@dtos/emailDTO');
const attributes = { exclude: ['createdAt', 'updatedAt', 'deleted_at'] };

exports.create = async (emailData) => {
    const createDTO = new CreateEmailDTO(emailData);
    const transaction = await sequelize.transaction();
    try {
        const email = await Email.create(createDTO, { transaction });
        await transaction.commit();
        return new EmailResponseDTO(email);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async (req) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(Email, req.query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const emails = await Email.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : attributes,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });
    
    pagination.data = emails.map(email => new EmailResponseDTO(email));
    return pagination;
};

exports.getById = async (id) => {
    const email = await Email.findByPk(id);
    if (!email) {
        throw new AppError('Email não encontrado.', { statusCode: 404, sourceModel: 'Email', saveDB: false });
    }
    return new EmailResponseDTO(email);
};

exports.update = async (id, emailData) => {
    const updateDTO = new UpdateEmailDTO(emailData);
    const transaction = await sequelize.transaction();
    try {
        let email = await Email.findByPk(id, { transaction });
        if (!email) {
            await transaction.rollback();
            return null;
        }
        await email.update(updateDTO, { transaction });
        await transaction.commit();
        return new EmailResponseDTO(email);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const email = await Email.findByPk(id, { transaction });
        if (!email) {
            await transaction.rollback();
            return false;
        }
        await email.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
