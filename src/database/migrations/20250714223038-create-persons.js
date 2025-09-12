const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('persons', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date_of_birth: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            rg: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            cpf: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            street: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            neighborhood: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        });

        const hashedPassword = await bcrypt.hash('123456', 10);
        await queryInterface.bulkInsert('persons', [{
            id: uuidv4(),
            admin: true,
            name: 'Henrique',
            last_name: 'Souza',
            date_of_birth: '1992-09-26',
            rg: '123456789',
            cpf: '12345678901',
            street: 'Main St',
            number: '123',
            neighborhood: 'Downtown',
            city: 'Anytown',
            state: 'CA',
            username: 'rick',
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
        }], {});
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('persons');
    },
};
