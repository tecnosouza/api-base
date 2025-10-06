 
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PhoneNote extends Model {
        static associate(models) {
            PhoneNote.belongsTo(models.Person, { foreignKey: 'logged_user_id', as: 'loggedUser' });
            PhoneNote.belongsTo(models.Phone, { foreignKey: 'table_id', as: 'phone' });
        }
    }
    PhoneNote.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        logged_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        table_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
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
        modelName: 'PhoneNote',
        tableName: 'phone_notes',
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return PhoneNote;
};
