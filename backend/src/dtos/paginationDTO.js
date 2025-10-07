class PaginationDTO {
    constructor(pagination) {
        this.limit = String(pagination.limit);
        this.page = String(pagination.page);
        this.prev_page_url = pagination.prev_page_url;
        this.next_page_url = pagination.next_page_url;
        this.last_page = parseInt(pagination.last_page);
        this.total = parseInt(pagination.total);
    }
}

module.exports = {
    PaginationDTO,
};
