const DataBaseService = require('../database/services/DataBaseService');
const { EmailNote, sequelize } = require('@models/index.js');
const { CreateEmailNoteDTO, UpdateEmailNoteDTO, EmailNoteResponseDTO } = require('@dtos/emailNoteDTO');
const { PaginationDTO } = require('@dtos/paginationDTO');
const attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] };

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

exports.getAll = async (query) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(EmailNote, query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const emailNotes = await EmailNote.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : attributes,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });
    
    return { data: emailNotes.map(emailNote => new EmailNoteResponseDTO(emailNote)), pagination: new PaginationDTO(pagination) };
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
