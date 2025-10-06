'use strict';

const tableName = 'access_levels';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            level_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            crude: {
                type: Sequelize.TEXT,
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
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            }
        }, {
            indexes: [
                {
                    fields: ['level_name'],
                },
                {
                    fields: ['is_active'],
                }
            ],
        });

        await queryInterface.bulkInsert(tableName, [
            {
                level_name: 'Acesso total',
                is_active: true,
                crude: '[{"id":"dashboard","label":"dashboard","to":"/","c":"1","r":"1","u":"1","d":"1","e":[],"level":0},{"id":"warehouses","label":"warehouses","to":"/register/warehouses","c":"1","r":"1","u":"1","d":"1","e":[],"level":1},{"id":"clients","label":"clients","to":"/register/clients","c":"1","r":"1","u":"1","d":"1","e":{},"level":1},{"id":"suppliers","label":"suppliers","to":"/register/suppliers","c":"1","r":"1","u":"1","d":"1","e":[],"level":1},{"id":"storages","label":"storages","to":"/register/products/storages","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"categories","label":"categories","to":"/register/products/categories","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"colors","label":"colors","to":"/register/products/colors","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"sizes","label":"sizes","to":"/register/products/sizes","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"},{"id":"memories","label":"memories","to":"/register/products/memories","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"products","label":"products","to":"/register/products/product","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"users","label":"users","to":"/register/users","c":"1","r":"1","u":"1","d":"1","e":{"ap":"1"},"level":2},{"id":"sectors","label":"sectors","to":"/register/sectors","c":"1","r":"1","u":"1","d":"1","e":[],"level":2},{"id":"payments-conditions","label":"payments-conditions","to":"/register/payments-conditions","c":"1","r":"1","u":"1","d":"1","e":[]},{"id":"operations","label":"operations","to":"/register/operations","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"},{"id":"stock","label":"stock","to":"/stock","c":"1","r":"1","u":"1","d":"1","e":[],"level":0},{"id":"sales","label":"sales","to":"/sales","c":"1","r":"1","u":"1","d":"1","e":[],"level":0},{"id":"categories-cash-flow","label":"categories-cash-flow","to":"/cash-flow/categories-cash-movement","c":"1","r":"1","u":"1","d":"1","e":[]},{"id":"movements-cash-flow","label":"movements-cash-flow","to":"/cash-flow/cash-movement","c":"1","r":"1","u":"1","d":"1","e":[]},{"id":"report-pendencies","label":"report-pendencies","to":"/reports/pendencies","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"},{"id":"report-stock","label":"report-stock","to":"/reports/products-in-stock","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"},{"id":"configurations","label":"configurations","to":"/configurations","c":"1","r":"1","u":"1","d":"1","e":[],"level":"0"}]',
                default: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                level_name: 'Sem acesso',
                is_active: true,
                crude: '[{"label": "dashboard","level": 0,"c": "0","r": "0","u": "1","d": "0","e": []},{"label": "warehouses","level": 1,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "clients","level": 1,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "suppliers","level": 1,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "products","level": 1,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "system_users","level": 1,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "access_level","level": 2,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "users","level": 2,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "sectors","level": 2,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "stock",        "level": 0,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "sales","level": 0,"c": "1","r": "1","u": "1","d": "1","e": []}]',
                default: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                level_name: 'Acesso limitado',
                is_active: true,
                crude: '[{"label": "dashboard","level": 0,"c": "0","r": "0","u": "1","d": "0","e": []},{"label": "warehouses","level": 1,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "clients","level": 1,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "suppliers","level": 1,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "products","level": 1,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "system_users","level": 1,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "access_level","level": 2,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "users","level": 2,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "sectors","level": 2,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "stock",        "level": 0,"c": "1","r": "1","u": "1","d": "1","e": []},{"label": "sales","level": 0,"c": "1","r": "1","u": "1","d": "1","e": []}]',
                default: false,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.dropTable(tableName);
    }
};
