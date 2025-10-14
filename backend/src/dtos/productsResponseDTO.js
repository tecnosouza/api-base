class ProductsResponseDTO {
    constructor(product) {
        this.id = product.id;
        this.category_id = product.category_id;
        this.model = product.model;
        this.description = product.description;
        this.values = product.values;
        this.price = product.price;
        this.applications = product.applications;
        this.photo_name = product.photo_name;
        this.photo_size = product.photo_size;
        this.photo_link = product.photo_link;
        this.is_active = product.is_active;
        this.created_at = product.created_at;
        this.updated_at = product.updated_at;
        if (product.category) {
            this.category = {
                id: product.category.id,
                title_menu: product.category.title_menu,
                title: product.category.title,
                description: product.category.description,
                is_active: product.category.is_active,
            };
        }
    }
}

class SiteProductsResponseDTO {
    constructor(product) {
        this.id = product.id;
        this.model = product.model;
        this.description = product.description;
        this.values = product.values;
        this.price = product.price;
        this.applications = product.applications;
        this.photo_link = product.photo_link;
    }
}

module.exports = { ProductsResponseDTO, SiteProductsResponseDTO };
