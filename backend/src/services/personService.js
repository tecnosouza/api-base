const AppError = require('@utils/appError');
const ModelName = 'personService';
const { Person, sequelize } = require('@models/index.js');
const DataBaseService = require('../database/services/DataBaseService');
const bcrypt = require('bcryptjs');
const { CreatePersonDTO, UpdatePersonDTO, PersonResponseDTO } = require('@dtos/personDTO');
const { PaginationDTO } = require('@dtos/paginationDTO');
const attributes = { exclude: ['created_at', 'updated_at', 'deleted_at'] };

exports.create = async (personData) => {
    const createDTO = new CreatePersonDTO(personData);
    const transaction = await sequelize.transaction();
    try {
        const { username, password, name, lastName, dateOfBirth, rg, cpf, street, number, neighborhood, city, state } = createDTO;

        let person = await Person.findOne({ where: { username }, transaction });
        if (person) {
            await transaction.rollback();
            throw new AppError(
                'Usuário já cadastrado!',
                {
                    statusCode: 409,
                    sourceModel: ModelName,
                    saveDB: true,
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        person = await Person.create({
            username,
            password: hashedPassword,
            name,
            lastName,
            dateOfBirth,
            rg,
            cpf,
            street,
            number,
            neighborhood,
            city,
            state
        }, { transaction });

        await transaction.commit();
        return new PersonResponseDTO(person);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async (query) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(Person, query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const persons = await Person.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : attributes,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });
    
    return { data: persons.map(person => new PersonResponseDTO(person)), pagination: new PaginationDTO(pagination) };
};

exports.getById = async (id) => {
    const person = await Person.findByPk(id);
    if (!person) {
        throw new AppError('Pessoa não encontrada.', { statusCode: 404, sourceModel: 'Person', saveDB: false });
    }
    return new PersonResponseDTO(person);
};

exports.update = async (id, personData) => {
    const updateDTO = new UpdatePersonDTO(personData);
    const transaction = await sequelize.transaction();
    try {
        let person = await Person.findByPk(id, { transaction });
        if (!person) {
            await transaction.rollback();
            return null;
        }

        const { username, password } = updateDTO; // Only destructure used properties

        if (username && username !== person.username) {
            const existingPerson = await Person.findOne({ where: { username }, transaction });
            if (existingPerson) {
                await transaction.rollback();
                throw new AppError(
                    'Usuário já cadastrado!',
                    {
                        statusCode: 409,
                        sourceModel: ModelName,
                        saveDB: true,
                    }
                );
            }
        }

        if (password) {
            personData.password = await bcrypt.hash(password, 10);
        }

        await person.update(updateDTO, { transaction });
        await transaction.commit();
        return new PersonResponseDTO(person);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const person = await Person.findByPk(id, { transaction });
        if (!person) {
            await transaction.rollback();
            return false;
        }
        await person.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
