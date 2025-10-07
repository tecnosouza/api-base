class CreateEmailDTO {
    constructor({ personId, email, isMain }) {
        this.personId = personId;
        this.email = email;
        this.isMain = isMain;
    }
}

class UpdateEmailDTO {
    constructor({ personId, email, isMain }) {
        this.personId = personId;
        this.email = email;
        this.isMain = isMain;
    }
}

class EmailResponseDTO {
    constructor(email) {
        this.id = email.id;
        this.personId = email.personId;
        this.email = email.email;
        this.isMain = email.isMain;
        this.createdAt = email.createdAt;
        this.updatedAt = email.updatedAt;
        this.deletedAt = email.deletedAt;
    }
}

module.exports = {
    CreateEmailDTO,
    UpdateEmailDTO,
    EmailResponseDTO
};
