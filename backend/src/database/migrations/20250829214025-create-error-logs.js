'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('error_logs', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true
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
                type: DataTypes.JSON,
                allowNull: true,
            },
            request_body: {
                type: DataTypes.JSON,
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
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('error_logs');
    },
};
