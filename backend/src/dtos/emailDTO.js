class CreateEmailDTO {
    constructor({ person_id, provider, email, default: isDefault }) {
        this.person_id = person_id;
        this.provider = provider;
        this.email = email;
        this.default = isDefault;
    }
}

class UpdateEmailDTO {
    constructor({ person_id, provider, email, default: isDefault }) {
        this.person_id = person_id;
        this.provider = provider;
        this.email = email;
        this.default = isDefault;
    }
}

class EmailResponseDTO {
    constructor(email) {
        this.id = email.id;
        this.person_id = email.person_id;
        this.provider = email.provider;
        this.email = email.email;
        this.default = email.default;
        this.created_at = email.created_at;
        this.updated_at = email.updated_at;
        this.deleted_at = email.deleted_at;
    }
}

module.exports = {
    CreateEmailDTO,
    UpdateEmailDTO,
    EmailResponseDTO
};
