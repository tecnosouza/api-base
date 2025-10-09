const DataBaseService = require('../database/services/DataBaseService');
const { Category, sequelize } = require('@models/index.js');
const { CreateCategoryDTO, UpdateCategoryDTO, CategoryResponseDTO, SiteCategoryResponseDTO } = require('@dtos/categoryDTO');
const { PaginationDTO } = require('@dtos/paginationDTO');
const { normalizeString } = require('@utils/stringUtils');
const attributes = { exclude: ['updated_at', 'deleted_at'] };

exports.create = async (categoryData) => {
    const createDTO = new CreateCategoryDTO(categoryData);
    const transaction = await sequelize.transaction();
    try {        
        createDTO.path = normalizeString(createDTO.title_menu);
        const category = await Category.create(createDTO, { transaction });
        await transaction.commit();
        return new CategoryResponseDTO(category);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getAll = async (query) => {
    const include = [];
    const pagination = await DataBaseService.dataFilter(Category, query, include);
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
    
    return { data: categories.map(category => new CategoryResponseDTO(category)), pagination: new PaginationDTO(pagination) };
};


exports.update = async (id, categoryData) => {
    const updateDTO = new UpdateCategoryDTO(categoryData);
    const transaction = await sequelize.transaction();
    try {
        updateDTO.path = normalizeString(updateDTO.title_menu);
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
        await category.destroy({ transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

exports.getSite = async () => {
    const categories = await Category.findAll({ where: { is_active: true }});
    return categories.map(category => new SiteCategoryResponseDTO(category));
};
