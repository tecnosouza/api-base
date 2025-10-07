const AppError = require('@utils/appError');
const ModelName = 'PhoneNote';
const { PhoneNote, sequelize } = require('@models/index.js');
const { CreatePhoneNoteDTO, UpdatePhoneNoteDTO, PhoneNoteResponseDTO } = require('@dtos/phoneNoteDTO');

exports.create = async (phoneNoteData) => {
    const createDTO = new CreatePhoneNoteDTO(phoneNoteData);
    const transaction = await sequelize.transaction();
    try {
        const phoneNote = await PhoneNote.create(createDTO, { transaction });
        await transaction.commit();
        return new PhoneNoteResponseDTO(phoneNote);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async () => {
    const phoneNotes = await PhoneNote.findAll();
    return phoneNotes.map(phoneNote => new PhoneNoteResponseDTO(phoneNote));
};

exports.getById = async (id) => {
    const phoneNote = await PhoneNote.findByPk(id);
    if (!phoneNote) {
        throw new AppError('Nota de telefone não encontrada.', { statusCode: 404, sourceModel: ModelName, saveDB: false });
    }
    return new PhoneNoteResponseDTO(phoneNote);
};

exports.update = async (id, phoneNoteData) => {
    const updateDTO = new UpdatePhoneNoteDTO(phoneNoteData);
    const transaction = await sequelize.transaction();
    try {
        let phoneNote = await PhoneNote.findByPk(id, { transaction });
        if (!phoneNote) {
            await transaction.rollback();
            return null;
        }
        await phoneNote.update(updateDTO, { transaction });
        await transaction.commit();
        return new PhoneNoteResponseDTO(phoneNote);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const phoneNote = await PhoneNote.findByPk(id, { transaction });
        if (!phoneNote) {
            await transaction.rollback();
            return false;
        }
        await phoneNote.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
