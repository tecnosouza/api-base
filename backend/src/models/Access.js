 
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Access extends Model {
        static associate(models) {
            Access.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' });
        }
    }
    Access.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        person_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        crude: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        modelName: 'Access',
        tableName: 'accesses',
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return Access;
};
