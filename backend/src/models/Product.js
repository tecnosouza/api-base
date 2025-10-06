 
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
            Product.belongsTo(models.Storage, { foreignKey: 'storage_id', as: 'storage' });
            Product.belongsTo(models.Color, { foreignKey: 'color_id', as: 'color' });
            Product.belongsTo(models.Memory, { foreignKey: 'memory_id', as: 'memory' });
            Product.belongsTo(models.Size, { foreignKey: 'size_id', as: 'size' });
        }
    }
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        storage_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        memory_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        size_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        chip: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        obs: {
            type: DataTypes.STRING,
            allowNull: true,
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
        modelName: 'Product',
        tableName: 'products',
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
    return Product;
};
