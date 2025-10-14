/* eslint-disable no-unused-vars */
const AppError = require('@utils/appError');
const DataBaseService = require('../database/services/DataBaseService');
const { ProductsResponseDTO, SiteProductsResponseDTO } = require('@dtos/productsResponseDTO');
const { PaginationDTO } = require('@dtos/paginationDTO');
const { Product, Category, sequelize } = require('@models/index.js');
const { moveFile, deleteFile } = require('../utils/fileUtils.js');
const path = require('path');
const fs = require('fs');

exports.create = async (req) => {
    const transaction = await sequelize.transaction();
    const file = req.file;
    const tmpFilePath = file ? path.join(__dirname, '../../', file.path) : null; // caminho original do tmp

    try {
        const { model, description, values, applications, category_id, price } = req.body;

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
            price,
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
    return new ProductsResponseDTO(product);
};

exports.update = async (id, req) => {
    const transaction = await sequelize.transaction();
    const file = req.file;
    const tmpFilePath = file ? path.join(__dirname, '../../', file.path) : null;

    try {
        const { model, description, values, applications, category_id, price } = req.body;

        // Busca produto existente
        let product = await Product.findByPk(id, { transaction });
        if (!product) {
            await transaction.rollback();
            throw new AppError('Produto não encontrado.', {
                statusCode: 404,
                sourceModel: 'Product',
                saveDB: false,
            });
        }

        // Usa o category_id atual se não for enviado no body
        const finalCategoryId = category_id || product.category_id;

        // Verifica duplicidade de model (exceto se for o mesmo produto)
        if (model && model !== product.model) {
            const existingProduct = await Product.findOne({ where: { model }, transaction });
            if (existingProduct) {
                await transaction.rollback();
                throw new AppError('Produto já cadastrado!', {
                    statusCode: 409,
                    sourceModel: 'Product',
                    saveDB: true,
                });
            }
        }

        let imageName = product.photo_name;
        let imageSize = product.photo_size;
        let imageLink = product.photo_link;

        // Se veio novo arquivo → remove o antigo e move o novo
        if (file) {
            imageName = file.filename;
            imageSize = file.size;

            const newDir = path.join(__dirname, '../../uploads', finalCategoryId.toString());
            const newPath = path.join(newDir, file.filename);

            // Cria a pasta se não existir
            if (!fs.existsSync(newDir)) {
                fs.mkdirSync(newDir, { recursive: true });
            }

            // Remove imagem antiga, se existir
            if (product.photo_name) {
                const oldPath = path.join(
                    __dirname,
                    '../../uploads',
                    product.category_id.toString(),
                    product.photo_name
                );

                // Evita erro se o arquivo não existir mais
                try {
                    await deleteFile(oldPath);
                } catch (err) {
                    console.warn('⚠️ Arquivo antigo não encontrado para remoção:', oldPath);
                }
            }

            // Move o novo arquivo
            await moveFile(file.path, newPath);

            // Atualiza o link final da nova imagem
            imageLink = `${req.protocol}://${req.get('host')}/uploads/${finalCategoryId}/${file.filename}`;
        }

        // Atualiza os dados do produto
        await product.update(
            {
                model: model ?? product.model,
                category_id: finalCategoryId,
                description: description ?? product.description,
                price: price ?? product.price,
                values: values ?? product.values,
                applications: applications ?? product.applications,
                photo_name: imageName,
                photo_size: imageSize,
                photo_link: imageLink,
            },
            { transaction }
        );

        await transaction.commit();
        return product;
    } catch (error) {
        await transaction.rollback();
        throw error;
    } finally {
        // Sempre remove o tmp
        if (tmpFilePath) {
            await deleteFile(tmpFilePath);
        }
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

exports.getSite = async (idCategory) => {
    const products = await Product.findAll({ where: { is_active: true, category_id: idCategory } });
    return products.map(product => new SiteProductsResponseDTO(product));
};
