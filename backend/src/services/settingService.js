const { Setting, sequelize } = require('@models/index.js');
const AppError = require('@utils/appError');
const ModelName = 'settingService';

exports.create = async (settingData) => {
    const transaction = await sequelize.transaction();
    try {
        const { person_id, scale, style_menu, theme } = settingData;

        let setting = await Setting.findOne({ where: { person_id }, transaction });
        if (setting) {
            await transaction.rollback();
            throw new AppError(
                'Configuração para este usuário já cadastrada!',
                {
                    statusCode: 409,
                    sourceModel: ModelName,
                    saveDB: true,
                }
            );
        }

        setting = await Setting.create({
            person_id,
            scale,
            style_menu,
            theme
        }, { transaction });

        await transaction.commit();
        if (!setting) {
            throw new AppError('Configuração não encontrada.', { statusCode: 404, sourceModel: 'Setting', saveDB: false });
        }
        return setting;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async () => {
    const settings = await Setting.findAll();
    return settings;
};

exports.getById = async (id) => {
    const setting = await Setting.findByPk(id);
    if (!setting) {
        throw new AppError('Configuração não encontrada.', { statusCode: 404, sourceModel: 'Setting', saveDB: false });
    }
    return setting;
};

exports.update = async (id, settingData) => {
    const transaction = await sequelize.transaction();
    try {
        let setting = await Setting.findByPk(id, { transaction });
        if (!setting) {
            await transaction.rollback();
            return null;
        }

        const { person_id } = settingData;

        if (person_id && person_id !== setting.person_id) {
            const existingSetting = await Setting.findOne({ where: { person_id }, transaction });
            if (existingSetting) {
                await transaction.rollback();
                throw new AppError(
                    'Configuração para este usuário já cadastrada!',
                    {
                        statusCode: 409,
                        sourceModel: ModelName,
                        saveDB: true,
                    }
                );
            }
        }

        await setting.update(settingData, { transaction });
        await transaction.commit();
        if (!setting) {
            throw new AppError('Configuração não encontrada.', { statusCode: 404, sourceModel: 'Setting', saveDB: false });
        }
        return setting;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const setting = await Setting.findByPk(id, { transaction });
        if (!setting) {
            await transaction.rollback();
            return false;
        }
        await setting.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
