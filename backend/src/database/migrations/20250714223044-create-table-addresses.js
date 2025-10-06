'use strict';

const tableName = 'addresses';

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
                allowNull: true,
                references: { model: 'persons', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            default: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: true,
            },
            zipcode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            street: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            number: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            complement: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            neighborhood: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            latitude: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            longitude: {
                type: Sequelize.DOUBLE,
                allowNull: false,
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
                    fields: ['person_id'],
                },
                {
                    fields: ['warehouse_id'],
                },
                {
                    fields: ['is_active'],
                }
            ],
        });

        await queryInterface.bulkInsert(tableName, [
            {
                person_id: 1,
                default: true,
                zipcode: '13227130',
                street: 'Rua campo grande',
                number: 134,
                complement: 'Casa 1',
                neighborhood: 'Recanto quarto centenário',
                city: 'Várzea Paulista',
                state: 'São Paulo',
                latitude: '-23.6027226',
                longitude: '-46.7881327',
                is_active: true,
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
