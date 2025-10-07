'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('error_logs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            person_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'persons', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            level: {
                type: DataTypes.ENUM('INFO', 'WARN', 'ERROR', 'FATAL'),
                allowNull: false,
                defaultValue: 'ERROR',
            },
            message: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            stack_trace: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            source_model: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            request_url: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            request_method: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            request_headers: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            request_body: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            status_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 500,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
        }, {
            indexes: [
                {
                    fields: ['person_id'],
                },
                {
                    fields: ['level'],
                },
                {
                    fields: ['request_url'],
                }
            ],
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('error_logs');
    },
};
