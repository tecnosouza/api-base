const { AccessLevel, sequelize } = require('@models/index.js');
const AppError = require('@utils/appError');

const { CreateAccessLevelDTO, UpdateAccessLevelDTO, AccessLevelResponseDTO } = require('@dtos/accessLevelDTO');


exports.create = async (accessLevelData) => {
    const createDTO = new CreateAccessLevelDTO(accessLevelData);
    const transaction = await sequelize.transaction();
    try {
        const accessLevel = await AccessLevel.create(createDTO, { transaction });
        await transaction.commit();
        return new AccessLevelResponseDTO(accessLevel);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async () => {
    const accessLevels = await AccessLevel.findAll();
    return accessLevels.map(accessLevel => new AccessLevelResponseDTO(accessLevel));
};

exports.getById = async (id) => {
    const accessLevel = await AccessLevel.findByPk(id);
    if (!accessLevel) {
        throw new AppError('Nível de acesso não encontrado.', { statusCode: 404, sourceModel: 'AccessLevel', saveDB: false });
    }
    return new AccessLevelResponseDTO(accessLevel);
};

exports.update = async (id, accessLevelData) => {
    const updateDTO = new UpdateAccessLevelDTO(accessLevelData);
    const transaction = await sequelize.transaction();
    try {
        let accessLevel = await AccessLevel.findByPk(id, { transaction });
        if (!accessLevel) {
            await transaction.rollback();
            return null;
        }
        await accessLevel.update(updateDTO, { transaction });
        await transaction.commit();
        return new AccessLevelResponseDTO(accessLevel);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const accessLevel = await AccessLevel.findByPk(id, { transaction });
        if (!accessLevel) {
            await transaction.rollback();
            return false;
        }
        await accessLevel.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
