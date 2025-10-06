'use strict';

const tableName = 'accesses';

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
                unique: true,
            },
            crude: {
                type: Sequelize.TEXT,
                allowNull: false,
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
                }
            ],
        });

        await queryInterface.bulkInsert(tableName, [
            {
                person_id: 1,
                crude: '[{"id":"dashboard","label":"dashboard","to":"/","c":"1","r":"1","u":"1","d":"1","e":[],"level":0},{"id":"warehouses","label":"warehouses","to":"/register/warehouses","c":"1","r":"1","u":"1","d":"1","e":[],"level":1},{"id":"clients","label":"clients","to":"/register/clients","c":"1","r":"1","u":"1","d":"1","e":{},"level":1},{"id":"suppliers","label":"suppliers","to":"/register/suppliers","c":"1","r":"1","u":"1","d":"1","e":[],"level":1},{"id":"storages","label":"storages","to":"/register/products/storages","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"categories","label":"categories","to":"/register/products/categories","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"colors","label":"colors","to":"/register/products/colors","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"sizes","label":"sizes","to":"/register/products/sizes","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"},{"id":"memories","label":"memories","to":"/register/products/memories","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"products","label":"products","to":"/register/products/product","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"users","label":"users","to":"/register/users","c":"1","r":"1","u":"1","d":"1","e":{"ap":"1"},"level":2},{"id":"sectors","label":"sectors","to":"/register/sectors","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"payments-conditions","label":"payments-conditions","to":"/register/payments-conditions","c":"1","r":"1","u":"1","d":"1","e":[]},{"id":"operations","label":"operations","to":"/register/operations","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"},{"id":"stock","label":"stock","to":"/stock","c":"1","r":"1","u":"1","d":"1","e":[],"level":0},{"id":"sales","label":"sales","to":"/sales","c":"1","r":"1","u":"1","d":"1","e":[],"level":0},{"id":"categories-cash-flow","label":"categories-cash-flow","to":"/cash-flow/categories-cash-movement","c":"1","r":"1","u":"1","d":"1","e":[]},{"id":"movements-cash-flow","label":"movements-cash-flow","to":"/cash-flow/cash-movement","c":"1","r":"1","u":"1","d":"1","e":[]},{"id":"report-pendencies","label":"report-pendencies","to":"/reports/pendencies","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"},{"id":"report-best-clients","label":"report-best-clients","to":"/reports/best-clients","c":"1","r":"1","u":"1","d":"1","e":[]},{"id":"report-most-profitable-products","label":"report-most-profitable-products","to":"/reports/most-profitable-products","c":"1","r":"1","u":"1","d":"1","e":[]},{"id":"report-stock","label":"report-stock","to":"/reports/products-in-stock","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"},{"id":"report-stock","label":"report-stock","to":"/reports/sales-products","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"},{"id":"report-comission","label":"report-comission","to":"/reports/commissions","c":"1","r":"1","u":"1","d":"1","e":[]},{"id":"configurations","label":"configurations","to":"/configurations","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"}]',
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
