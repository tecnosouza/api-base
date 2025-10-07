class createRequestDTO {
    constructor({ category_id, model, description, values, applications, photo, is_active }) {
        this.category_id = category_id;
        this.model = model;
        this.description = description;
        this.values = values;
        this.applications = applications;
        this.photo = photo;
        this.is_active = is_active;
    }
}

class updateRequestDTO {
    constructor({ category_id, model, description, values, applications, photo, is_active }) {
        if (category_id !== undefined) this.category_id = category_id;
        if (model !== undefined) this.model = model;
        if (description !== undefined) this.description = description;
        if (values !== undefined) this.values = values;
        if (applications !== undefined) this.applications = applications;
        if (photo !== undefined) this.photo = photo;
        if (is_active !== undefined) this.is_active = is_active;
    }
}

class createResponseDTO {
    constructor(product) {
        this.id = product.id;
        this.category_id = product.category_id;
        this.model = product.model;
        this.description = product.description;
        this.values = product.values;
        this.applications = product.applications;
        this.photo = product.photo;
        this.is_active = product.is_active;
        this.created_at = product.created_at;
        this.updated_at = product.updated_at;
        this.deleted_at = product.deleted_at;
    }
}

module.exports = {
    createRequestDTO,
    updateRequestDTO,
    createResponseDTO
};
