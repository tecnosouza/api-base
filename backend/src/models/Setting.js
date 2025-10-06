/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Setting extends Model {
        static associate(models) {
            Setting.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' });
        }
    }
    Setting.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        person_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        scale: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        style_menu: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        theme: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Setting',
        tableName: 'settings',
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return Setting;
};
