class createRequestDTO {
    constructor({ person_id, ddi, ddd, number, default: isDefault }) {
        this.person_id = person_id;
        this.ddi = ddi;
        this.ddd = ddd;
        this.number = number;
        this.default = isDefault;
    }
}

class updateRequestDTO {
    constructor({ person_id, ddi, ddd, number, default: isDefault }) {
        if (person_id !== undefined) this.person_id = person_id;
        if (ddi !== undefined) this.ddi = ddi;
        if (ddd !== undefined) this.ddd = ddd;
        if (number !== undefined) this.number = number;
        if (isDefault !== undefined) this.default = isDefault;
    }
}

class createResponseDTO {
    constructor(phone) {
        this.id = phone.id;
        this.person_id = phone.person_id;
        this.ddi = phone.ddi;
        this.ddd = phone.ddd;
        this.number = phone.number;
        this.default = phone.default;
        this.created_at = phone.created_at;
        this.updated_at = phone.updated_at;
        this.deleted_at = phone.deleted_at;
    }
}

module.exports = {
    createRequestDTO,
    updateRequestDTO,
    createResponseDTO
};
