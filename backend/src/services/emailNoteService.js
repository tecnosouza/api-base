const { EmailNote, sequelize } = require('@models/index.js');

const { CreateEmailNoteDTO, UpdateEmailNoteDTO, EmailNoteResponseDTO } = require('@dtos/emailNoteDTO');


exports.create = async (emailNoteData) => {
    const createDTO = new CreateEmailNoteDTO(emailNoteData);
    const transaction = await sequelize.transaction();
    try {
        const emailNote = await EmailNote.create(createDTO, { transaction });
        await transaction.commit();
        return new EmailNoteResponseDTO(emailNote);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async () => {
    const emailNotes = await EmailNote.findAll();
    return emailNotes.map(emailNote => new EmailNoteResponseDTO(emailNote));
};

exports.getById = async (id) => {
    const emailNote = await EmailNote.findByPk(id);
    return emailNote ? new EmailNoteResponseDTO(emailNote) : null;
};

exports.update = async (id, emailNoteData) => {
    const updateDTO = new UpdateEmailNoteDTO(emailNoteData);
    const transaction = await sequelize.transaction();
    try {
        let emailNote = await EmailNote.findByPk(id, { transaction });
        if (!emailNote) {
            await transaction.rollback();
            return null;
        }
        await emailNote.update(updateDTO, { transaction });
        await transaction.commit();
        return new EmailNoteResponseDTO(emailNote);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const emailNote = await EmailNote.findByPk(id, { transaction });
        if (!emailNote) {
            await transaction.rollback();
            return false;
        }
        await emailNote.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
