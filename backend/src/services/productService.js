const DataBaseService = require('../database/services/DataBaseService');
const { Product, sequelize } = require('@models/index.js');
const AppError = require('@utils/appError');
const ModelName = 'productService';

exports.create = async (productData) => {
    const transaction = await sequelize.transaction();
    try {
        const { model, category_id, storage_id, color_id, memory_id, size_id, chip, obs, is_active } = productData;

        let product = await Product.findOne({ where: { model }, transaction });
        if (product) {
            await transaction.rollback();
            throw new AppError(
                'Produto já cadastrado!',
                {
                    statusCode: 409,
                    sourceModel: ModelName,
                    saveDB: true,
                }
            );
        }

        product = await Product.create({
            model,
            category_id,
            storage_id,
            color_id,
            memory_id,
            size_id,
            chip,
            obs,
            is_active
        }, { transaction });

        await transaction.commit();
        if (!product) {
            throw new AppError('Produto não encontrado.', { statusCode: 404, sourceModel: 'Product', saveDB: false });
        }
        return product;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async (req) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(Product, req.query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const products = await Product.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : null,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });
    
    pagination.data = products;
    return pagination;
};

exports.getById = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new AppError('Produto não encontrado.', { statusCode: 404, sourceModel: 'Product', saveDB: false });
    }
    return product;
};

exports.update = async (id, productData) => {
    const transaction = await sequelize.transaction();
    try {
        let product = await Product.findByPk(id, { transaction });
        if (!product) {
            await transaction.rollback();
            return null;
        }

        const { model } = productData;

        if (model && model !== product.model) {
            const existingProduct = await Product.findOne({ where: { model }, transaction });
            if (existingProduct) {
                await transaction.rollback();
                throw new AppError(
                    'Produto já cadastrado!',
                    {
                        statusCode: 409,
                        sourceModel: ModelName,
                        saveDB: true,
                    }
                );
            }
        }

        await product.update(productData, { transaction });
        await transaction.commit();
        if (!product) {
            throw new AppError('Produto não encontrado.', { statusCode: 404, sourceModel: 'Product', saveDB: false });
        }
        return product;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await Product.findByPk(id, { transaction });
        if (!product) {
            await transaction.rollback();
            return false;
        }
        await product.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
