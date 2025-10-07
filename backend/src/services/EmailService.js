const { Email, sequelize } = require('@models/index.js');
const AppError = require('@utils/appError');
const { CreateEmailDTO, UpdateEmailDTO, EmailResponseDTO } = require('@dtos/emailDTO');

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

exports.getAll = async () => {
    const emails = await Email.findAll();
    return emails.map(email => new EmailResponseDTO(email));
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

