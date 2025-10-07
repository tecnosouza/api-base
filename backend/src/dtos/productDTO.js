class createResponseDTO {
    constructor(product) {
        this.id = product.id;
        this.model = product.model;
        this.category_id = product.category_id;
        this.storage_id = product.storage_id;
        this.color_id = product.color_id;
        this.memory_id = product.memory_id;
        this.size_id = product.size_id;
        this.chip = product.chip;
        this.obs = product.obs;
        this.is_active = product.is_active;
    }
}

module.exports = {
    createResponseDTO
};
