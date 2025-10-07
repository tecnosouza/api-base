const { Address, sequelize } = require('@models/index.js');

const { CreateAddressDTO, UpdateAddressDTO, AddressResponseDTO } = require('@dtos/addressDTO');


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

exports.getAll = async () => {
    const addresses = await Address.findAll();
    return addresses.map(address => new AddressResponseDTO(address));
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
