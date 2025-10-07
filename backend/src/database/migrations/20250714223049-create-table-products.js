'use strict';

const tableName = 'products';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            model: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            values: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            applications: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            photo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        }, {
            indexes: [
                {
                    fields: ['model'],
                },
                {
                    fields: ['is_active'],
                }
            ],
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable(tableName);
    }

};
