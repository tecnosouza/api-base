const { Category, sequelize } = require('@models/index.js');
const { CreateCategoryDTO, UpdateCategoryDTO, CategoryResponseDTO } = require('@dtos/categoryDTO');

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

exports.getAll = async () => {
    const categories = await Category.findAll();
    return categories.map(category => new CategoryResponseDTO(category));
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
