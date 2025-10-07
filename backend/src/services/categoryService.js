const DataBaseService = require('../database/services/DataBaseService');
const { Category, sequelize } = require('@models/index.js');
const { CreateCategoryDTO, UpdateCategoryDTO, CategoryResponseDTO } = require('@dtos/categoryDTO');
const attributes = { exclude: ['createdAt', 'updatedAt', 'deleted_at'] };

exports.create = async (categoryData) => {
    const createDTO = new CreateCategoryDTO(categoryData);
    const transaction = await sequelize.transaction();
    try {
        const category = await Category.create(createDTO, { transaction });
        await transaction.commit();
        return new CategoryResponseDTO(category);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async (req) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(Category, req.query, include);
    if (pagination.code != 200) {
        return pagination;
    }

    const categories = await Category.findAll({
        where: pagination.objWhere,
        attributes: (pagination.attributes != undefined) ? pagination.attributes : attributes,
        include: (pagination.include && pagination.include.length > 0) ? pagination.include : null,
        order: (pagination.orderBy && pagination.orderBy.length > 0) ? pagination.orderBy : [['id', 'DESC']],
        limit: pagination.limit ? parseInt(pagination.limit) : null
    });
    
    pagination.data = categories.map(category => new CategoryResponseDTO(category));
    return pagination;
};

exports.getById = async (id) => {
    const category = await Category.findByPk(id);
    return category ? new CategoryResponseDTO(category) : null;
};

exports.update = async (id, categoryData) => {
    const updateDTO = new UpdateCategoryDTO(categoryData);
    const transaction = await sequelize.transaction();
    try {
        let category = await Category.findByPk(id, { transaction });
        if (!category) {
            await transaction.rollback();
            return null;
        }
        await category.update(updateDTO, { transaction });
        await transaction.commit();
        return new CategoryResponseDTO(category);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.delete = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const category = await Category.findByPk(id, { transaction });
        if (!category) {
            await transaction.rollback();
            return false;
        }
        await category.update({ deletedAt: new Date() }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
