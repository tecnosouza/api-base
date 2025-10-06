/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        static associate(models) {
            Address.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' });
            Address.belongsTo(models.Warehouse, { foreignKey: 'warehouse_id', as: 'warehouse' });
        }
    }
    Address.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        person_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        warehouse_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        default: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        complement: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        modelName: 'Address',
        tableName: 'addresses',
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return Address;
};
