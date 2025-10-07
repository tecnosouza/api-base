const AppError = require('@utils/appError');
const DataBaseService = require('../database/services/DataBaseService');
const ModelName = 'PersonNote';
const { PersonNote, sequelize } = require('@models/index.js');
const { CreatePersonNoteDTO, UpdatePersonNoteDTO, PersonNoteResponseDTO } = require('@dtos/personNoteDTO');
const attributes = { exclude: ['createdAt', 'updatedAt', 'deleted_at'] };

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

exports.getAll = async (req) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(PersonNote, req.query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const personNotes = await PersonNote.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : attributes,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });
    
    pagination.data = personNotes.map(personNote => new PersonNoteResponseDTO(personNote));
    return pagination;
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
