/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AccessLevel extends Model {
        static associate(models) {
            // define association here
        }
    }
    AccessLevel.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        level_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        crude: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        default: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
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
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'AccessLevel',
        tableName: 'access_levels',
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return AccessLevel;
};
