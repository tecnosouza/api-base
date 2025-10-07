class ProductsResponseDTO {
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
        if (product.category) {
            this.category = {
                id: product.category.id,
                name: product.category.name,
            };
        }
    }
}

module.exports = ProductsResponseDTO;
