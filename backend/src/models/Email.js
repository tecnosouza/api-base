/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Email extends Model {
        static associate(models) {
            Email.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' });
        }
    }
    Email.init({
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
        provider: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
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
    }, {
        sequelize,
        modelName: 'Email',
        tableName: 'emails',
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return Email;
};
