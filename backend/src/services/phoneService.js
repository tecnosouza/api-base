const DataBaseService = require('../database/services/DataBaseService');
const AppError = require('@utils/appError');
const { Phone, sequelize } = require('@models/index.js');
const { createRequestDTO, updateRequestDTO, createResponseDTO } = require('@dtos/phoneDTO');
const attributes = { exclude: ['createdAt', 'updatedAt', 'deleted_at'] };

exports.create = async (phoneData) => {
    const transaction = await sequelize.transaction();
    try {
        const createData = new createRequestDTO(phoneData);
        const phone = await Phone.create(createData, { transaction });
        await transaction.commit();
        return new createResponseDTO(phone);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async (req) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(Phone, req.query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const phones = await Phone.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : attributes,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });
    
    pagination.data = phones.map(phone => new createResponseDTO(phone));
    return pagination;
};

exports.getById = async (id) => {
    const phone = await Phone.findByPk(id);
    if (!phone) {
        throw new AppError('Telefone não encontrado.', { statusCode: 404, sourceModel: 'Phone', saveDB: false });
    }
    return new createResponseDTO(phone);
};

exports.update = async (id, phoneData) => {
    const transaction = await sequelize.transaction();
    try {
        let phone = await Phone.findByPk(id, { transaction });
        if (!phone) {
            await transaction.rollback();
            return null;
        }
        const updateData = new updateRequestDTO(phoneData);
        await phone.update(updateData, { transaction });
        await transaction.commit();
        return new createResponseDTO(phone);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const phone = await Phone.findByPk(id, { transaction });
        if (!phone) {
            await transaction.rollback();
            return false;
        }
        await phone.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
