 
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EmailNote extends Model {
        static associate(models) {
            EmailNote.belongsTo(models.Person, { foreignKey: 'logged_user_id', as: 'loggedUser' });
            EmailNote.belongsTo(models.Email, { foreignKey: 'table_id', as: 'email' });
        }
    }
    EmailNote.init({
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
        modelName: 'EmailNote',
        tableName: 'email_notes',
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return EmailNote;
};
