const AppError = require('@utils/appError');
const ModelName = 'productService';
const DataBaseService = require('../database/services/DataBaseService');
const { ProductsResponseDTO } = require('@dtos/productsResponseDTO');
const { PaginationDTO } = require('@dtos/paginationDTO');
const { Product, Category, sequelize } = require('@models/index.js');
const { moveFile, deleteFile } = require('../utils/fileUtils.js');
const path = require('path');

exports.create = async (req) => {
    const transaction = await sequelize.transaction();
    const file = req.file;
    const tmpFilePath = file ? path.join(__dirname, '../../', file.path) : null; // caminho original do tmp

    try {
        const { model, description, values, applications, category_id } = req.body;

        let imageName = null;
        let imageSize = null;
        let imageLink = null;

        if (file) {
            imageName = file.filename;
            imageSize = file.size;

            // novo caminho: ./backend/uploads/$category_id/imageName
            const newDir = path.join(__dirname, '../../uploads', category_id.toString());
            const newPath = path.join(newDir, file.filename);

            // move o arquivo do tmp para a pasta final
            await moveFile(file.path, newPath);

            imageLink = `${req.protocol}://${req.get('host')}/uploads/${category_id}/${file.filename}`;
        }

        let product = await Product.findOne({ where: { model }, transaction });
        if (product) {
            await transaction.rollback();
            throw new AppError('Produto já cadastrado!', {
                statusCode: 409,
                sourceModel: 'Product',
                saveDB: true,
            });
        }

        product = await Product.create({
            model,
            category_id,
            description,
            values,
            applications,
            photo_name: imageName,
            photo_size: imageSize,
            photo_link: imageLink,
        }, { transaction });

        await transaction.commit();

        if (!product) {
            throw new AppError('Produto não encontrado.', { statusCode: 404, sourceModel: 'Product', saveDB: false });
        }

        return product;

    } catch (error) {
        await transaction.rollback();
        throw error;
    } finally {
        // Remove o arquivo do tmp sempre
        if (tmpFilePath) {
            await deleteFile(tmpFilePath);
        }
    }
};

exports.getAll = async (query) => {
    const include = [
        {
            model: Category,
            as: 'category',
            attributes: ['id', 'title_menu'] 
        }
    ];

    const pagination = await DataBaseService.dataFilter(Product, query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const products = await Product.findAll({
        where: pagination.objWhere,
        attributes: pagination.attributes ?? null,
        include,
        order: pagination.orderBy?.length ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });

    return {
        data: products.map(product => new ProductsResponseDTO(product)),
        pagination: new PaginationDTO(pagination)
    };
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
        await product.destroy({ transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
