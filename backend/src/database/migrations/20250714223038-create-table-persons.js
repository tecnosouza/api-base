const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('persons', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
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
            },
            cpf: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
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
        }, {
            indexes: [
                {
                    fields: ['username'],
                }
            ],
        });
		
        await queryInterface.sequelize.query('CREATE UNIQUE INDEX unique_rg_not_deleted ON persons (rg) WHERE rg IS NOT NULL AND deleted_at IS NULL;');

        const hashedPassword = await bcrypt.hash('123456', 10);
        await queryInterface.bulkInsert('persons', [{
            admin: true,
            name: 'Henrique',
            last_name: 'Souza',
            date_of_birth: '1992-09-26',
            rg: '123456789',
            cpf: '12345678901',
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
