'use strict';

const tableName = 'settings';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            person_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'persons', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                unique: true,
            },
            scale: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            style_menu: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            theme: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        }, {
            indexes: [
                {
                    fields: ['person_id'],
                }
            ],
        });

        await queryInterface.bulkInsert(tableName, [
            {
                person_id: '1',
                scale: '14',
                style_menu: '0',
                theme: '1',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },
    async down(queryInterface) {
        await queryInterface.dropTable(tableName);
        await queryInterface.bulkDelete(tableName, null, {});
    }
};
