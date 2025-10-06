 
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Phone extends Model {
        static associate(models) {
            Phone.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' });
        }
    }
    Phone.init({
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
        ddi: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ddd: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING,
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
    }, {
        sequelize,
        modelName: 'Phone',
        tableName: 'phones',
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return Phone;
};
