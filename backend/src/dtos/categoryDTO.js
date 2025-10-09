class CreateCategoryDTO {
    constructor({ title_menu, title, description, is_active }) {
        this.title_menu = title_menu;
        this.title = title;
        this.description = description;
        this.is_active = is_active;
        this.path = null;
    }
}

class UpdateCategoryDTO {
    constructor({ title_menu, title, description, is_active }) {
        this.title_menu = title_menu;
        this.title = title;
        this.description = description;
        this.is_active = is_active;
    }
}

class CategoryResponseDTO {
    constructor(category) {
        this.id = category.id;
        this.title_menu = category.title_menu;
        this.title = category.title;
        this.description = category.description;
        this.is_active = category.is_active;
        this.created_at = category.created_at;
        this.updated_at = category.updated_at;
        this.deleted_at = category.deleted_at;
    }
}

class SiteCategoryResponseDTO {
    constructor(category) {
        this.id = category.id;
        this.title_menu = category.title_menu;
        this.title = category.title;
        this.description = category.description;
        this.path = category.path;
    }
}

module.exports = {
    CreateCategoryDTO,
    UpdateCategoryDTO,
    CategoryResponseDTO,
    SiteCategoryResponseDTO
};
