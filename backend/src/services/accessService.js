const DataBaseService = require('../database/services/DataBaseService');
const { Access, sequelize } = require('@models/index.js');
const { CreateAccessDTO, UpdateAccessDTO, AccessResponseDTO } = require('@dtos/accessDTO');
const { PaginationDTO } = require('@dtos/paginationDTO');
const attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] };

exports.create = async (accessData) => {
    const createDTO = new CreateAccessDTO(accessData);
    const transaction = await sequelize.transaction();
    try {
        const access = await Access.create(createDTO, { transaction });
        await transaction.commit();
        return new AccessResponseDTO(access);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async (query) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(Access, query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const accesses = await Access.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : attributes,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });
	
    return { data: accesses.map(access => new AccessResponseDTO(access)), pagination: new PaginationDTO(pagination) };
};

exports.getById = async (id) => {
    const access = await Access.findByPk(id);
    return access ? new AccessResponseDTO(access) : null;
};

exports.update = async (id, accessData) => {
    const updateDTO = new UpdateAccessDTO(accessData);
    const transaction = await sequelize.transaction();
    try {
        let access = await Access.findByPk(id, { transaction });
        if (!access) {
            await transaction.rollback();
            return null;
        }
        await access.update(updateDTO, { transaction });
        await transaction.commit();
        return new AccessResponseDTO(access);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const access = await Access.findByPk(id, { transaction });
        if (!access) {
            await transaction.rollback();
            return false;
        }
        await access.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
