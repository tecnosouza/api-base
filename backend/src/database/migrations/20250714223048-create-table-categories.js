'use strict';

const tableName = 'categories';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
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
                    fields: ['description'],
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
