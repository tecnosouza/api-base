const { Person, sequelize } = require('@models/index.js');
const bcrypt = require('bcryptjs');
const { AuthRegisterResponseDTO } = require('@dtos/authDTO');
const AppError = require('@utils/appError');
const ModelName = 'personService';

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
