const DataBaseService = require('../database/services/DataBaseService');
const AppError = require('@utils/appError');
const ModelName = 'PhoneNote';
const { PhoneNote, sequelize } = require('@models/index.js');
const { PaginationDTO } = require('@dtos/paginationDTO');
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

exports.getAll = async (query) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(PhoneNote, query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const phoneNotes = await PhoneNote.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : null,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });
    
    return { data: phoneNotes.map(phoneNote => new PhoneNoteResponseDTO(phoneNote)), pagination: new PaginationDTO(pagination) };
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
