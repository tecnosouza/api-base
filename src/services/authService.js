const { Person, sequelize } = require('@models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthRegisterResponseDTO } = require('@dtos/authDTO');
const AppError = require('@utils/appError');
const ModelName = 'authService';

exports.register = async (personData) => {
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

exports.login = async (username, password) => {
    const person = await Person.findOne({ where: { username } });

    if (!person) {
        throw new AppError('Login e/ou senha inválidos', {
            statusCode: 401,
            sourceModel: 'Person',
            saveDB: false,
        });
    }

    const passwordIsValid = await bcrypt.compare(password, person.password);
    if (!passwordIsValid) {
        throw new AppError('Login e/ou senha inválidos', {
            statusCode: 401,
            sourceModel: 'Person',
            saveDB: false,
        });
    }

    const {
        id,
        name,
        cpf,
        username: email,
        admin,
    } = person.get({ plain: true });

    const personData = admin
        ? { id, fullName: name, cpfCnpj: cpf, email, role: 'admin' }
        : { id };

    const token = jwt.sign(personData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { token, personData };
};
