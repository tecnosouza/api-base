const AppError = require('@utils/appError');
const ModelName = 'PersonNote';
const { PersonNote, sequelize } = require('@models/index.js');
const { CreatePersonNoteDTO, UpdatePersonNoteDTO, PersonNoteResponseDTO } = require('@dtos/personNoteDTO');

exports.create = async (personNoteData) => {
    const createDTO = new CreatePersonNoteDTO(personNoteData);
    const transaction = await sequelize.transaction();
    try {
        const personNote = await PersonNote.create(createDTO, { transaction });
        await transaction.commit();
        return new PersonNoteResponseDTO(personNote);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async () => {
    const personNotes = await PersonNote.findAll();
    return personNotes.map(personNote => new PersonNoteResponseDTO(personNote));
};

exports.getById = async (id) => {
    const personNote = await PersonNote.findByPk(id);
    if (!personNote) {
        throw new AppError('Nota de pessoa não encontrada.', { statusCode: 404, sourceModel: ModelName, saveDB: false });
    }
    return new PersonNoteResponseDTO(personNote);
};

exports.update = async (id, personNoteData) => {
    const updateDTO = new UpdatePersonNoteDTO(personNoteData);
    const transaction = await sequelize.transaction();
    try {
        let personNote = await PersonNote.findByPk(id, { transaction });
        if (!personNote) {
            await transaction.rollback();
            return null;
        }
        await personNote.update(updateDTO, { transaction });
        await transaction.commit();
        return new PersonNoteResponseDTO(personNote);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const personNote = await PersonNote.findByPk(id, { transaction });
        if (!personNote) {
            await transaction.rollback();
            return false;
        }
        await personNote.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
