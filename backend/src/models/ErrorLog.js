// models/errorLog.js
'use strict';

module.exports = (sequelize, DataTypes) => {
    const ErrorLog = sequelize.define('ErrorLog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        person_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            type: DataTypes.JSONB,
            allowNull: true,
        },
        request_body: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.UUID,
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
    }, {
        sequelize,
        modelName: 'ErrorLog',
        tableName: 'error_logs',
        paranoid: false,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return ErrorLog;
};
