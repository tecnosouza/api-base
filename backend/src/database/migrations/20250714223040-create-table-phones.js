'use strict';

const tableName = 'phones';

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
            ddi: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            ddd: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            number: {
                type: Sequelize.STRING,
                allowNull: false,
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
                    fields: ['number'],
                },
                {
                    fields: ['default'],
                }
            ],
        });

        await queryInterface.bulkInsert(tableName, [
            {
                person_id: 1,
                default: true,
                ddi: 55,
                ddd: 11,
                number: '964464779',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.dropTable(tableName);
        await queryInterface.bulkDelete(tableName, null, {});
    },
};
