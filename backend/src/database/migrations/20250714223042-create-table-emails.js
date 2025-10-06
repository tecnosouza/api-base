'use strict';

const tableName = 'emails';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            person_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'persons', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            provider: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            default: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: true,
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
                    fields: ['person_id'],
                },
                {
                    fields: ['email'],
                }
            ],
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable(tableName);
    },
};
