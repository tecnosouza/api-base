class CreateCategoryDTO {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
    }
}

class UpdateCategoryDTO {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
    }
}

class CategoryResponseDTO {
    constructor(category) {
        this.id = category.id;
        this.name = category.name;
        this.description = category.description;
        this.createdAt = category.createdAt;
        this.updatedAt = category.updatedAt;
        this.deletedAt = category.deletedAt;
    }
}

module.exports = {
    CreateCategoryDTO,
    UpdateCategoryDTO,
    CategoryResponseDTO
};
