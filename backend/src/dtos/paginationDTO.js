class PaginationDTO {
    constructor(pagination) {
        this.current_page = parseInt(pagination.current_page);
        this.last_page = parseInt(pagination.last_page);
        this.total = parseInt(pagination.total);
        this.per_page = parseInt(pagination.limit);
    }
}

module.exports = {
    PaginationDTO,
};
