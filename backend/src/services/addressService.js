const DataBaseService = require('../database/services/DataBaseService');
const { Address, sequelize } = require('@models/index.js');
const { CreateAddressDTO, UpdateAddressDTO, AddressResponseDTO } = require('@dtos/addressDTO');
const { PaginationDTO } = require('@dtos/paginationDTO');
const attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] };

exports.create = async (addressData) => {
    const createDTO = new CreateAddressDTO(addressData);
    const transaction = await sequelize.transaction();
    try {
        const address = await Address.create(createDTO, { transaction });
        await transaction.commit();
        return new AddressResponseDTO(address);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async (query) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(Address, query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const addresses = await Address.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : attributes,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });

    return { data: addresses.map(address => new AddressResponseDTO(address)), pagination: new PaginationDTO(pagination) };
};

exports.getById = async (id) => {
    const address = await Address.findByPk(id);
    return address ? new AddressResponseDTO(address) : null;
};

exports.update = async (id, addressData) => {
    const updateDTO = new UpdateAddressDTO(addressData);
    const transaction = await sequelize.transaction();
    try {
        let address = await Address.findByPk(id, { transaction });
        if (!address) {
            await transaction.rollback();
            return null;
        }
        await address.update(updateDTO, { transaction });
        await transaction.commit();
        return new AddressResponseDTO(address);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const address = await Address.findByPk(id, { transaction });
        if (!address) {
            await transaction.rollback();
            return false;
        }
        await address.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
