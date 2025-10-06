'use strict';

const tableName = 'phone_notes';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            logged_user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'persons', key: 'id' }
            },
            table_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'phones', key: 'id' }
            },            
            text: {
                type: Sequelize.TEXT,
                allowNull: false
            },            
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true
            }
        }, {
            indexes: [
                {
                    fields: ['logged_user_id'],
                },
                {
                    fields: ['table_id'],
                }
            ],
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable(tableName);
    }

};
