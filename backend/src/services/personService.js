const { Person, sequelize } = require('@models/index.js');
const bcrypt = require('bcryptjs');
const { AuthRegisterResponseDTO } = require('@dtos/authDTO');
const AppError = require('@utils/appError');
const ModelName = 'personService';

exports.create = async (personData) => {
    const transaction = await sequelize.transaction();
    try {
        const { username, password, name, lastName, dateOfBirth, rg, cpf, street, number, neighborhood, city, state } = personData;

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
        return new AuthRegisterResponseDTO(person);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async () => {
    const persons = await Person.findAll();
    return persons.map(person => new AuthRegisterResponseDTO(person));
};

exports.getById = async (id) => {
    const person = await Person.findByPk(id);
    return person ? new AuthRegisterResponseDTO(person) : null;
};

exports.update = async (id, personData) => {
    const transaction = await sequelize.transaction();
    try {
        let person = await Person.findByPk(id, { transaction });
        if (!person) {
            await transaction.rollback();
            return null;
        }

        const { username, password } = personData; // Only destructure used properties

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

        await person.update(personData, { transaction });
        await transaction.commit();
        return new AuthRegisterResponseDTO(person);
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
