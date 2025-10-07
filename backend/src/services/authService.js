const { Person } = require('@models/index.js');
const AppError = require('@utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthLoginRequestDTO, AuthLoginResponseDTO } = require('@dtos/authDTO');

exports.login = async (loginData) => {
    const loginDTO = new AuthLoginRequestDTO(loginData);
    const { username, password } = loginDTO;
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

    return new AuthLoginResponseDTO(token, personData);
};
