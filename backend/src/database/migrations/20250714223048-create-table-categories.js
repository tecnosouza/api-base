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
            title_menu: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            path: {
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

        await queryInterface.bulkInsert(tableName, [
            {
                title_menu: 'Aditivos + adesivos',
                title: 'Aditivos + adesivos',
                description: 'Nossos Produtos',
                path: 'aditivos-adesivos',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title_menu: 'Argamassas poliméricas para impermeabilização',
                title: 'Argamassas poliméricas para impermeabilização',
                description: 'Nossos Produtos',
                path: 'argamassas-polimericas',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title_menu: 'Selantes',
                title: 'Selantes',
                description: 'Nossos Produtos',
                path: 'selantes',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title_menu: 'Acrílicos (manta líquida) e masquite',
                title: 'Acrílicos e masquite',
                description: '(Manta líquida)',
                path: 'acrilicos',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title_menu: 'Membrana auto adesivas alumínio',
                title: 'Membrana auto adesivas alumínio',
                description: 'Nossos Produtos',
                path: 'membrana-auto-adesivas',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title_menu: 'Mantas asfálticas',
                title: 'Mantas asfálticas',
                description: 'Nossos Produtos',
                path: 'mantas-asfalticas',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title_menu: 'Primer',
                title: 'Primer',
                description: 'Nossos Produtos',
                path: 'primer',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title_menu: 'Recuperação estrutural e impermeabilização',
                title: 'Recuperação estrutural e impermeabilização',
                description: 'Nossos Produtos',
                path: 'recuperacao-estrutural',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], {});
    },

    async down(queryInterface) {
        await queryInterface.dropTable(tableName);
    }

};
